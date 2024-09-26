const verLocal = async (client, message) => {
  const mapsUrl = "http://maps.app.goo.gl/wBLuZwXs7jA2x8L49"; // Exemplo de URL
  await client.sendText(
    message.from,
    `Você pode nos encontrar neste local: ${mapsUrl}`
  );
};

export default {
  exec: verLocal,
};
