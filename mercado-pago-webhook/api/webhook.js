import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // Verificação de segurança (usando o Access Token do Mercado Pago)
        const authToken = req.headers['Authorization'] || '';
        if (authToken !== `Bearer APP_USR-4955486456905091-102723-a87f224dca7df4eb52d1c8e11bb9387b-1640150181`) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        // Verifica se a notificação é de pagamento
        if (data && data.type === 'payment') {
            const paymentId = data.data.id;

            try {
                // Buscar detalhes do pagamento na API do Mercado Pago
                const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                    headers: {
                        'Authorization': `Bearer APP_USR-4955486456905091-102723-a87f224dca7df4eb52d1c8e11bb9387b-1640150181`
                    }
                });
                const paymentInfo = await response.json();

                // Processamento dos dados do pagamento
                if (paymentInfo.status === 'approved') {
                    // Aqui, você pode liberar o conteúdo para o usuário, por exemplo
                    console.log(`Pagamento aprovado para o ID: ${paymentId}`);
                }

                // Responder ao Mercado Pago que recebemos a notificação
                res.status(200).json({ status: "success" });
            } catch (error) {
                console.error("Erro ao processar o pagamento:", error);
                res.status(500).json({ error: "Erro interno no servidor" });
            }
        } else {
            res.status(400).json({ error: "Tipo de notificação inválido" });
        }
    } else {
        // Caso não seja uma requisição POST, retorna erro
        res.status(405).json({ error: "Método não permitido" });
    }
}
