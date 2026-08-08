export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/functions/test") {
      return new Response("Worker funcionando!");
    }

    if (url.pathname === "/functions/deauth") {
      const ip = url.searchParams.get("ip");

      if (!ip) {
        return new Response("IP não informado", { status: 400 });
      }

      return new Response("Pedido de desconexão recebido para: " + ip);
    }

    return new Response("Not Found", { status: 404 });
  }
};
