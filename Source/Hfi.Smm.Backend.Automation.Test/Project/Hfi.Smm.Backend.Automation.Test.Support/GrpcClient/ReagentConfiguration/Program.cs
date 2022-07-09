using Grpc.Net.Client;
using BeckmanCoulter.DxH.Hfi.Smm.Protos.V1;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

namespace BeckmanCoulter.DxH.Hfi.Backend.Automation.Test.Support.ReagentConfigGrpcClient
{
    public class Program
    {
        public record StatusOKResponse
        {
            public string? StatusCode { get; set; }
        }
        public record StatusNotOKResponse
        {
            public string? StatusCode { get; set; }
            public Reagent[]? UnattendedReagents { get; set; }
            public Reagent[]? EmptyReagents { get; set; }
        }

        public record Reagent
        {
            public string? Id { get; set; }
            public string? Key { get; set; }
            public string? ProductName { get; set; }
            public string? Name { get; set; }
        }

        public static string GetStatus(string url)
        {
            var channel = GrpcChannel.ForAddress(url);
            var client = new Consumable.ConsumableClient(channel);
            var responseStatus = client.GetReagentStatus(new GetReagentStatusRequest { InstrumentId = "1" });
            Console.WriteLine(responseStatus);
            var covertedToString = responseStatus.ToString();
            return covertedToString;
        }

        public static void CallGrpcService()
        {
            Thread.Sleep(2000);
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
        }
        public static void Main()
        {
            var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: false);

            IConfiguration config = builder.Build();

            CallGrpcService();
            string fileName = "ReagentConfigGrpcResponse.json";
            FileInfo fileInfo = new FileInfo(fileName);
            string reagentConfigGrpcResponsePath = fileInfo.FullName;
            Console.Write(reagentConfigGrpcResponsePath);
            string exportedContent;
            Console.WriteLine("Getting status...");
            string url = config.GetSection("gRPC").GetSection("ConsumableService").Value;
            string status = GetStatus(url);
            exportedContent = status;
            File.WriteAllText(reagentConfigGrpcResponsePath, exportedContent);
        }
    }
}