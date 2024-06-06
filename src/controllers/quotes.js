import axios from 'axios';
import translate from 'translate';

//google tradutor
translate.engine = 'google';
translate.key = 'YOUR_GOOGLE_TRANSLATE_API_KEY';

export const getQuote = async (req, res) => {
    const url = 'https://api.quotable.io/random';

    try {
        const response = await axios.get(url);
        const quote = response.data;
        
        // traduz a frase p portugues
        const translatedContent = await translate(quote.content, 'pt');
        const translatedAuthor = await translate(quote.author, 'pt');

        res.render('quote', { quote: { content: translatedContent, author: translatedAuthor } });
    } catch (error) {
        console.error("Erro ao buscar citação:", error);
        res.status(500).send("Erro ao buscar citação.");
    }
};
