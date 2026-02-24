// This file handles API routes on Vercel
export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Menu data
    const menuData = {
        drinks: [
            { id: 'd1', name: 'Iced Latte', description: 'Double espresso, oat milk, agave', price: 4.75, icon: 'fa-coffee', category: 'drinks' },
            { id: 'd2', name: 'Matcha Lemonade', description: 'Matcha, lemon, mint', price: 5.25, icon: 'fa-leaf', category: 'drinks' },
            { id: 'd3', name: 'Spiced Chai', description: 'Cardamom & cinnamon', price: 4.50, icon: 'fa-mug-hot', category: 'drinks' },
            { id: 'd4', name: 'Berry Smoothie', description: 'Banana, berries, almond milk', price: 6.25, icon: 'fa-blender', category: 'drinks' },
            { id: 'd5', name: 'Watermelon Fresca', description: 'Fresh lime, mint, agave', price: 5.50, icon: 'fa-water', category: 'drinks' }
        ],
        food: [
            { id: 'f1', name: 'Avocado Toast', description: 'Sourdough, chili, lime', price: 7.90, icon: 'fa-bread-slice', category: 'food' },
            { id: 'f2', name: 'Hummus Bowl', description: 'Red pepper hummus, veggies, pita', price: 6.80, icon: 'fa-utensils', category: 'food' },
            { id: 'f3', name: 'Turkey Club', description: 'Turkey, bacon, aioli', price: 8.50, icon: 'fa-sandwich', category: 'food' },
            { id: 'f4', name: 'Caprese Skewers', description: 'Mozzarella, tomato, basil', price: 5.95, icon: 'fa-cheese', category: 'food' },
            { id: 'f5', name: 'Fruit & Cheese', description: 'Grapes, apple, brie, crackers', price: 7.25, icon: 'fa-apple-alt', category: 'food' }
        ]
    };

    // Route handling
    const { url, method } = req;
    const path = url.split('?')[0]; // Remove query params

    // API Routes
    if (path === '/api/menu') {
        return res.status(200).json({ success: true, data: menuData });
    }

    if (path === '/api/drinks') {
        return res.status(200).json({ success: true, count: menuData.drinks.length, data: menuData.drinks });
    }

    if (path === '/api/food') {
        return res.status(200).json({ success: true, count: menuData.food.length, data: menuData.food });
    }

    if (path.startsWith('/api/item/') && method === 'GET') {
        const id = path.split('/').pop();
        const allItems = [...menuData.drinks, ...menuData.food];
        const item = allItems.find(i => i.id === id);
        if (item) {
            return res.status(200).json({ success: true, data: item });
        }
        return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (path === '/api/order' && method === 'POST') {
        return res.status(200).json({ 
            success: true, 
            message: 'Order placed successfully!',
            data: { orderId: Date.now(), status: 'confirmed' }
        });
    }

    // Default 404 for unknown API routes
    if (path.startsWith('/api/')) {
        return res.status(404).json({ success: false, message: 'API endpoint not found' });
    }

    // For non-API routes, Vercel will serve static files
    res.status(200).end();
}