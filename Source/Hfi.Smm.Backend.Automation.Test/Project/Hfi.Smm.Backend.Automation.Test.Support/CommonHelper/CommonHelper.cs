using System;

namespace BeckmanCoulter.DxH.Hfi.Backend.Automation.Test.Support.CommonHelper
{
    public class CommonHelper
    {
        public static string CovertUrlEncode(string theRawValue)
        {
            string ValueAfterConvert = Uri.EscapeDataString(theRawValue);
            return ValueAfterConvert;
        }
        public static string GetCurrentTime(string theFormatTime)
        {
            DateTimeOffset time = DateTimeOffset.UtcNow;
            return time.ToString(theFormatTime);
        }
    }
}