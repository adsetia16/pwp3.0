using System.Collections.Generic;

namespace pwp3._0.Models
{
    public class User
    {
        public int UserId {get; set;}
        public string Nama {get; set;}
        public string NIP { get; set;}
        public List<string> Roles { get; set; }
    }
	public class DataCache
	{
		public string UnitIdOrganisasi { get; set; }
		public string UnitName { get; set; }
		public string RoleName { get; set; }
		public string RoleId { get; set; }
		public string KodeOrganisasi { get; set; }
	}

	public partial class RefUser
	{
		public int Id { get; set; }
		public int? IdPegawai { get; set; }
		public string Nama { get; set; }
		public string Nip18 { get; set; }
		public string Nip9 { get; set; }
		public string NIK { get; set; }
		public int? IdOrganisasi { get; set; }
		public string KodeOrganisasi { get; set; }
		public string RoleName { get; set; }
		public string UnitIdOrganisasi { get; set; }
		public string UnitName { get; set; }
	}

	public partial class SetRole
	{
		public string setRole { get; set; }
	}
}