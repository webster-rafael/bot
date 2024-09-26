import { storage } from "../storage.js";
import { VenomBot } from "../venom.js";
import { STAGES } from "./index.js";

export const initialStage = {
  async exec({ from, message }) {
    const selectedOption = message.trim(); // Captura e remove espaços desnecessários

    if (selectedOption === '6') {
      // Se o usuário digitar "6", mudar para o estágio Ver Local
      storage[from].stage = STAGES.VER_LOCAL;
      return stages[STAGES.VER_LOCAL].stage.exec({ from, message });
    }

    // Se não for "6", continuar o fluxo normal
    storage[from].stage = STAGES.MENU;

    const venombot = await VenomBot.getInstance();

    const messageToSend = `
      👋 Olá, como vai?
       Eu sou Madeirinho o 
       *assistente virtual* do 
       ${venombot.getSessionName}.
       
       *Atendimento* 
       Sexta a Domingo e feriados 
       das *09:00 as 19:00*
      *Posso te ajudar?* 🙋‍♂️
      -----------------------------------
      6️⃣ - VER LOCAL
      1️⃣ - ENCOMENDAS
      2️⃣ - INFORMAÇÕES DO LOCAL
      0️⃣ - FALAR COM ATENDENTE
    `;
    await venombot.sendText({ to: from, message: messageToSend });
  },
};


