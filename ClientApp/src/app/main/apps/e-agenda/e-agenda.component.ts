import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { EAgendaService } from './e-agenda.service';
import { CalendarEventModel } from './e-agenda.model';
import { AgendaEventFormDialogComponent } from './event-form/event-form.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


@Component({
  selector: 'app-e-agenda',
  templateUrl: './e-agenda.component.html',
  styleUrls: ['./e-agenda.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class EAgendaComponent implements OnInit {

  actions: CalendarEventAction[];
  activeDayIsOpen: boolean;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  dialogRef: any;
  events: CalendarEvent[];
  refresh: Subject<any> = new Subject();
  selectedDay: any;
  view: string;
  viewDate: Date;

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog,
    //private _calendarService: CalendarService
  ) {
    this.view = 'month';
    this.viewDate = new Date();
    this.activeDayIsOpen = true;
    this.selectedDay = { date: startOfDay(new Date()) };

    this.actions = [
      {
        label: '<i class="material-icons s-16">edit</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.editEvent('edit', event);
        }
      },
      {
        label: '<i class="material-icons s-16">delete</i>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.deleteEvent(event);
        }
      }
    ];

    /**
     * Get events from service/server
     */
    this.setEvents();
  }

  ngOnInit() {
    /**
         * Watch re-render-refresh for updating db
         */
    //   this.refresh.subscribe(updateDB => {
    //     if ( updateDB )
    //     {
    //         this._calendarService.updateEvents(this.events);
    //     }
    // });

    // this._calendarService.onEventsUpdated.subscribe(events => {
    //     this.setEvents();
    //     this.refresh.next();
    // });
  }

  setEvents(): void {
    // this.events = this._calendarService.events.map(item => {
    //     item.actions = this.actions;
    //     return new CalendarEventModel(item);
    // });
  }

  beforeMonthViewRender({ header, body }): void {
    /**
     * Get the selected day
     */
    const _selectedDay = body.find((_day) => {
      return _day.date.getTime() === this.selectedDay.date.getTime();
    });

    if (_selectedDay) {
      /**
       * Set selected day style
       * @type {string}
       */
      _selectedDay.cssClass = 'cal-selected';
    }

  }

  dayClicked(day: CalendarMonthViewDay): void {
    const date: Date = day.date;
    const events: CalendarEvent[] = day.events;

    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      }
      else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
    this.selectedDay = day;
    this.refresh.next();
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // console.warn('Dropped or resized', event);
    this.refresh.next(true);
  }

  deleteEvent(event): void {
    this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        const eventIndex = this.events.indexOf(event);
        this.events.splice(eventIndex, 1);
        this.refresh.next(true);
      }
      this.confirmDialogRef = null;
    });

  }

  editEvent(action: string, event: CalendarEvent): void {
    const eventIndex = this.events.indexOf(event);

     this.dialogRef = this._matDialog.open(AgendaEventFormDialogComponent, {
         panelClass: 'event-form-dialog',
         data      : {
             event : event,
             action: action
         }
     });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        const actionType: string = response[0];
        const formData: FormGroup = response[1];
        switch (actionType) {
          /**
           * Save
           */
          case 'save':

            this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
            this.refresh.next(true);

            break;
          /**
           * Delete
           */
          case 'delete':

            this.deleteEvent(event);

            break;
        }
      });
  }

  addEvent(): void {
    this.dialogRef = this._matDialog.open(AgendaEventFormDialogComponent, {
         panelClass: 'event-form-dialog',
         data      : {
             action: 'new',
             date  : this.selectedDay.date
         }
     });
    this.dialogRef.afterClosed()
      .subscribe((response: FormGroup) => {
        if (!response) {
          return;
        }
        const newEvent = response.getRawValue();
        newEvent.actions = this.actions;
        this.events.push(newEvent);
        this.refresh.next(true);
      });
  }

  /**
 * Toggle the sidebar
 *
 * @param name
 */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
