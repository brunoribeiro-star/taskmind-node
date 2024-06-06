import axios from 'axios';

export async function getQuote(req, res) {
    const url = 'https://api.quotable.io/random';

    try {
        const response = await axios.get(url);
        const quote = response.data;
        res.render('quote', { quote });
    } catch (error) {
        console.error("Erro ao buscar citação:", error);
        res.status(500).send("Erro ao buscar citação.");
    }
}
