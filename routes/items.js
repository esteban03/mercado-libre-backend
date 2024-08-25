import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`);
        const items = response.data.results.slice(0, 4).map(item => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: Math.floor(item.price),
                decimals: Math.round((item.price % 1) * 100)
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
        }));
        res.json({
            author: {
                name: "Esteban",
                lastname: "Sánchez"
            },
            categories: response.data.filters.find(filter => filter.id === 'category')?.values[0]?.path_from_root.map(category => category.name) || [],
            items
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [itemResponse, descriptionResponse] = await Promise.all([
            axios.get(`https://api.mercadolibre.com/items/${id}`),
            axios.get(`https://api.mercadolibre.com/items/${id}/description`)
        ]);
        
        if (!itemResponse.data) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const itemData = itemResponse.data;
        const descriptionData = descriptionResponse.data;

        const item = {
            id: itemData.id,
            title: itemData.title,
            price: {
                currency: itemData.currency_id,
                amount: Math.floor(itemData.price),
                decimals: Math.round((itemData.price % 1) * 100)
            },
            picture: itemData.pictures[0]?.url || itemData.thumbnail,
            condition: itemData.condition,
            free_shipping: itemData.shipping.free_shipping,
            sold_quantity: itemData.sold_quantity,
            description: descriptionData.plain_text
        };

        res.json({
            author: {
                name: "Esteban",
                lastname: "Sánchez"
            },
            item
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Item not found' });
        }
        console.error(error.message || error);
        res.status(500).json({ error: error.message || 'Something went wrong' });
    }
});


export default router;