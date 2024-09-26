import { VenomBot } from "../venom.js";
import { menu } from "../menu.js";
import { storage } from "../storage.js";
import { neighborhoods } from "./neighborhoods.js";
import { initialStage } from "./0.js";
import { STAGES } from "./index.js";

export const stageOne = {
  async exec(params) {
    const message = params.message.trim();
    const isMsgValid = /[0|1|2|6]/.test(message);

    let msg =
      "❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️";

    if (isMsgValid) {
      const option = options[Number(message)]();
      msg = option.message;
      storage[params.from].stage = option.nextStage || STAGES.INICIAL;
    }

    await VenomBot.getInstance().sendText({ to: params.from, message: msg });

    // Lógica para retornar ao menu após mostrar o local
    if (storage[params.from].stage === STAGES.VER_LOCAL) {
      // Adicionando um pequeno delay antes de reiniciar para evitar chamadas simultâneas
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 segundo de delay
      storage[params.from].stage = STAGES.INICIAL; // Retorna ao estágio inicial
      await initialStage.exec(params); // Mostra o estágio inicial (menu) novamente
    }

    // Lógica existente para os outros estágios
    if (storage[params.from].stage === STAGES.INICIAL) {
      await initialStage.exec(params);
    } else if (storage[params.from].stage === STAGES.FALAR_COM_ATENDENTE) {
      storage[params.from].finalStage = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(60), // 1 minuto de inatividade
      };
    }
  },
};

const options = {
  1: () => {
    let message = "🚨  CARDÁPIO  🚨\n\n";

    Object.keys(menu).forEach((value) => {
      message += `${numbers[value]} - _${menu[value].description}_ \n`;
    });

    return {
      message,
      nextStage: STAGES.CARRINHO,
    };
  },
  2: () => {
    const message =
      "\n-----------------------------------\n1️⃣ - ```FAZER PEDIDO``` \n0️⃣ - ```FALAR COM ATENDENTE```\n\n" +
      neighborhoods +
      "\n-----------------------------------\n1️⃣ - ```FAZER PEDIDO``` \n0️⃣ - ```FALAR COM ATENDENTE``` ";

    return {
      message,
      nextStage: null,
    };
  },
  6: () => {
    return {
      message: "🔗 Aqui está o local: http://maps.app.goo.gl/wBLuZwXs7jA2x8L49",
      nextStage: STAGES.VER_LOCAL,
      nextStage: STAGES.MENU,
    };
  },
  0: () => {
    return {
      message:
        "🔃 Encaminhando você para um atendente. \n⏳ *Aguarde um instante*.\n \n⚠️ A qualquer momento, digite *ENCERRAR* para encerrar o atendimento. ⚠️",
      nextStage: STAGES.FALAR_COM_ATENDENTE,
    };
  },
};

const numbers = {
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
};
