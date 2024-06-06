import axios from 'axios';
import translate from 'translate';

translate.engine = 'google'; // Usando o Google Translate
translate.key = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Adicione sua chave API do Google Translate aqui

export const getQuote = async (req, res) => {
    const url = 'https://api.quotable.io/random';

    try {
        const response = await axios.get(url);
        const quote = response.data;
        
        // Traduzir a citação para português
        const translatedContent = await translate(quote.content, 'pt');
        const translatedAuthor = await translate(quote.author, 'pt');

        res.render('quote', { quote: { content: translatedContent, author: translatedAuthor } });
    } catch (error) {
        console.error("Erro ao buscar citação:", error);
        res.status(500).send("Erro ao buscar citação.");
    }
};
