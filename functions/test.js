export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/functions/test") {
      return new Response("Worker funcionando!");
    }

    if (url.pathname === "/functions/deauth") {
      const token = request.headers.get("Authorization");

      if (token !== `Bearer ${env.OPENWRT_TOKEN}`) {
        return new Response("Não autorizado", { status: 401 });
      }

      const ip = url.searchParams.get("ip");

      if (!ip) {
        return new Response("IP não informado", { status: 400 });
      }

      return new Response(
        "Pedido de desconexão recebido para: " + ip
      );
    }

    return new Response("Not Found", { status: 404 });
  }
};