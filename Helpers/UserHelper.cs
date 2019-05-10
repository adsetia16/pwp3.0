using pwp3._0.Models;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pwp3._0.Helpers
{
    public class UserHelper
    {
        public static void SetUserCache(PegawaiInfo pegawaiInfo, string nip, IDistributedCache _cache)
        {
            var options = UserHelper.CacheOptions();
            _cache.SetString(nip + "-RoleName", pegawaiInfo.RoleName, options);
        }

        public static void SetUserCache(DataCache dataCache, string nip, IDistributedCache _cache)
        {
            var options = UserHelper.CacheOptions();
            _cache.SetString(nip + "-RoleName", dataCache.RoleName, options);
        }

        public static DistributedCacheEntryOptions CacheOptions()
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpiration = DateTime.Now.AddHours(2)
            };
            return options;
        }

        public static void UpdateUserCache(RefUser refUser, string nip, IDistributedCache _cache)
        {
            var options = UserHelper.CacheOptions();

            _cache.Remove(nip + "-RoleName");
            UserHelper.SetUserCache(new DataCache() {
                RoleName = refUser.RoleName
            }, nip, _cache);
        }

        public static async Task<DataCache> GetDataCache(string nip, IDistributedCache _cache)
        {
            string roleName = await _cache.GetStringAsync(nip + "-RoleName");

            return new DataCache()
            {
                RoleName = roleName
            };

        }
    }
}
