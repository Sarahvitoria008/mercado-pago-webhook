export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // Verifica se é uma notificação de pagamento
        if (data && data.type === 'payment') {
            const paymentId = data.data.id;
            console.log(`Recebido pagamento com ID: ${paymentId}`);

            // Aqui você pode adicionar lógica para processar o pagamento
        }

        // Envia uma resposta de sucesso para o Mercado Pago
        res.status(200).json({ status: "success" });
    } else {
        // Caso não seja uma requisição POST, retorna erro
        res.status(405).json({ error: "Método não permitido" });
    }
}
