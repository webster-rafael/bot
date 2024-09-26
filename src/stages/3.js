import { VenomBot } from '../venom.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const stageThree = {
  async exec({ from, message }) {
    storage[from].address = message
    storage[from].stage = STAGES.PEDIDO

    let msg = 'Pedido *CANCELADO* com sucesso. \n Volte Sempre!'
    if (message === '*') {
      storage[from].stage = STAGES.INICIAL
    } else {
      const itens = storage[from].itens
      const desserts = itens.map((item) => item.description).join(', ')
      const price = itens.map((item) => item.price).join(', ')

      msg =
        `🗒️ *RESUMO DO PEDIDO*: \n\n🧁 Produto: *${desserts}* \n🚚 Taxa de entrega: *Grátis para Nova Alvorada do Sul*. \n📍 Endereço: *${message}* \n💰 Valor: *${
          price
        },00 reais*. \n⏳ Tempo de entrega: *Definir com atendente*. \n\n` +
        '🔊 ```Agora, informe a forma de pagamento e se vai precisar de troco, por gentileza.```'
    }

    await VenomBot.getInstance().sendText({ to: from, message: msg })

    // return '✅ *Prontinho, pedido feito!* \n\nAgora, se você ainda não sabe o valor da taxa de entrega para sua região, vou te passar para um atendente para que ele verique o valor da *taxa de entrega*. \n\n⏳ *Aguarde um instante*.'
  },
}
