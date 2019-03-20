using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Pusintek.AspNetCore.RBAC.Filters;
using Pusintek.AspNetCore.RBAC.Models;
using pwp3._0.Models;
using System.Threading.Tasks;

namespace pwp3._0.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PegawaiController : KsbBaseController
    {
        public PegawaiController(IConfiguration configuration) : base(configuration)
        {
        }

        [BypassFilter]
        public async Task<IActionResult> GetPegawaiInfo() 
        {
            var result = await GetStringAsync("/hris/api/pegawai/GetPegawaiInfo");
            return Ok(result);
        }

        [HttpGet("{id}")]
        [BypassFilter]
        public async Task<IActionResult> GetPegawaiInfoByNip(string id)
        {
            var result = await GetStringAsync("/hris/api/pegawai/GetPegawaiInfoByNip/" + id);
            if (result != null)
            {
                PegawaiInfo model = JsonConvert.DeserializeObject<PegawaiInfo>(result);
                // set nip
                model.NIP = model.NIP18;
                return Ok(new ResultModel { isSuccessful = true, data = model });
            }
            else
            {
                return Ok(new ResultModel { isSuccessful = false, message = "Gagal mengambil info data pegawai." });
            }
        }

		[HttpGet("unit1")]
		public async Task<IActionResult> GetUnitEs1()
		{
			//limit = Int32.Parse(Request.Query["limit"]);
			//keyword = Request.Query["search"].ToString();

			var result = await GetStringAsync("/hris/api/organisasi/getunitoptions/35");
			//List<Unit> data = JsonConvert.DeserializeObject<List<Unit>>(result);

			//var Query = from m in data
			//			select m;

			//if (keyword.Length > 0)
			//{
			//	Query = Query.Where(a => a.NamaOrganisasi.Contains(keyword));
			//}

			//var unit = Query.Take(limit).ToList();

			return Ok(result);
		}
	}
}