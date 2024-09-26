// 6.js (verLocal)
import { STAGES } from "./index.js";
import { stageOne } from "./1.js"; // Importar o estágio 1 (Menu)
import { storage } from "../storage.js"; // Certifique-se de que o storage está importado

const verLocal = async (client, message) => {
  const mapsUrl = "http://maps.app.goo.gl/wBLuZwXs7jA2x8L49"; // Exemplo de URL

  // Enviar a mensagem com o link
  await client.sendText(message.from, `🔗 Aqui está o local: ${mapsUrl}`);

  // Atualizar o estágio para o Menu
  storage[message.from].stage = STAGES.MENU; // Mude para o estágio 1

  // Enviar a mensagem do menu
  await stageOne.exec({ from: message.from, message: "" }); // Reinicie o estágio 1 para mostrar o menu novamente
};

export default verLocal;
