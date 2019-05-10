using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Pusintek.AspNetCore.RBAC.DAO;
using Pusintek.AspNetCore.RBAC.Filters;
using pwp3._0.Helpers;
using pwp3._0.Models;
using System;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace pwp3._0.Controllers
{
	[Authorize]
	public class IndexController : KsbBaseController
	{
		private IConfiguration _configuration { get; set; }
		private IDistributedCache _cache;
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly CoreDbContext _db;
		public IndexController(IConfiguration configuration, IDistributedCache cache, UserManager<ApplicationUser> userManager, CoreDbContext db) : base(configuration)
		{
			_configuration = configuration;
			_cache = cache;
			_userManager = userManager;
			_db = db;
		}

		//[BypassFilter]
		//public IActionResult Index()
		//      {           
		//          if (User.Identity.IsAuthenticated)
		//              return Redirect("/home");
		//          else
		//              return Ok("You are not Authenticated");
		//      }

		[BypassFilter]
		[AllowAnonymous]
		public async Task<IActionResult> Index()
		{
			if (User.Identity.IsAuthenticated)
			{
				if (await SetCacheUser(true))
				{
					return Redirect("/home");
				}
				return Redirect("/Account/Logout");
			}
			else
				return Redirect("/Account/Login");
		}

		private async Task<bool> SetCacheUser(bool force = false)
		{
			bool result = true;
			try
			{
				var nip = User.Claims.FirstOrDefault(x => x.Type.Equals("nip")).Value;
				//var userRoles = _db.UserRoles.FirstOrDefault().RoleId;
				if (String.IsNullOrEmpty(nip) || force)
				{
					var role = _db.Roles.OrderBy(a => a.Name);
					var userRoles = role.FirstOrDefault().Id;
					var arrayRole = User.Claims.Where(x => x.Type.Equals(ClaimTypes.Role)).OrderBy(a => a.Value).Select(y => y.Value).ToArray();
					var administrator = Array.IndexOf(arrayRole, "Administrator");
					var currentRole = "";
					if (administrator > -1)
					{
						currentRole = "Administrator";
					}
					else
					{
						currentRole = User.Claims.Where(x => x.Type.Equals(ClaimTypes.Role)).OrderBy(a => a.Value).Select(y => y.Value).FirstOrDefault();
					}

					UserHelper.SetUserCache(new DataCache
					{
						RoleName = currentRole,
						RoleId = userRoles,
					}, nip, _cache);
				}
			}
			catch (Exception ex)
			{
				result = false;
				Console.WriteLine(ex);
			}
			return result;
		}

		[BypassFilter]
		public async Task<IActionResult> UserInfo()
		{
			var nama = User.Claims.FirstOrDefault(x => x.Type.Equals("nama")).Value;
			var nip = User.Claims.FirstOrDefault(x => x.Type.Equals("nip")).Value;
			var roles = User.Claims.Where(x => x.Type.Equals(ClaimTypes.Role)).Select(y => y.Value).FirstOrDefault();
			var userRoles = User.Claims.Where(x => x.Type.Equals(ClaimTypes.Role)).OrderBy(a => a.Value).Select(y => y.Value);
			var gravatar = "https://account.kemenkeu.go.id/manage/uploads/thumbnails/" + nip + ".jpg";
			var idPegawai = User.Identity.Name;

			await SetCacheUser(false);
			DataCache dataCache = await UserHelper.GetDataCache(nip, _cache);

			//var sort = dataCache.RoleName.Split(",");
			//var role = userRoles.FirstOrDefault();

			var result = new { Nama = nama, Nip = nip, Gravatar = gravatar, Roles = dataCache.RoleName, UserRoles = userRoles };

			return Ok(result);
		}

		[BypassFilter]
		[HttpPost]
		public async Task<IActionResult> ChangeUserInfo([FromBody] SetRole dataRole)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			var roleId = _db.Roles.FirstOrDefault(r => r.Name.Contains(dataRole.setRole));
			var nip = User.Claims.FirstOrDefault(x => x.Type.Equals("nip")).Value;
			// set kapan cache nya expired
			UserHelper.UpdateUserCache(new RefUser
			{
				RoleName = dataRole.setRole,
			}, nip, _cache);

			return await UserInfo();
		}

		[BypassFilter]
		public IActionResult Error()
		{
			ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
			return View();
		}

	}
}
