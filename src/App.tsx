import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useNavigate,
} from "react-router-dom";
import "./App.css";

const restaurants = [
    { id: "sushi", name: "Shūmatsu Shokudō", image: "/sushi/logo.png", mockTotal: "58 240" },
    { id: "dessert", name: "Le Dernier Dessert", image: "/dessert/logo.png", mockTotal: "62 310" },
    { id: "pizza", name: "Cosmic Burn Pizza", image: "/pizza/logo.png", mockTotal: "68 970" },
];

const dishesConfig = {
    sushi: [
        { name: "Cloudsong Nigiri", price: 3500, image: "/sushi/1.png" },
        { name: "Sea Breeze Maki", price: 2800, image: "/sushi/2.png" },
        { name: "Amber Silence", price: 5000, image: "/sushi/3.png" },
        { name: "Starlight Temaki", price: 6200, image: "/sushi/4.png" },
        { name: "Sesame Bridge", price: 4300, image: "/sushi/5.png" },
        { name: "Mariner's Verse", price: 2500, image: "/sushi/6.png" },
        { name: "Warm Stone", price: 3100, image: "/sushi/7.png" },
    ],
    pizza: [
        { name: "Solar Margherita", price: 4500, image: "/pizza/1.png" },
        { name: "Inferno Slice", price: 5800, image: "/pizza/2.png" },
        { name: "Moon Crust Quattro", price: 6000, image: "/pizza/3.png" },
        { name: "Tropic Ember", price: 5000, image: "/pizza/4.png" },
        { name: "Garden Nova", price: 3900, image: "/pizza/5.png" },
        { name: "Carnivore Comet", price: 6800, image: "/pizza/6.png" },
        { name: "BBQ Superflare", price: 5900, image: "/pizza/7.png" },
    ],
    dessert: [
        { name: "Velvet Echo", price: 2700, image:  "/dessert/1.png"},
        { name: "Sugar Whisper", price: 2600, image:  "/dessert/2.png"},
        { name: "Glass Garden", price: 4900, image:  "/dessert/3.png"},
        { name: "Caramel Mirage", price: 5700, image:  "/dessert/4.png"},
        { name: "Crème Aurora", price: 5200, image:  "/dessert/5.png"},
        { name: "Breeze Soufflé", price: 4600, image:  "/dessert/6.png"},
        { name: "Opera Eclipse", price: 6300, image:  "/dessert/7.png"},
    ],
};


function RestaurantList() {
    return (
        <div className="page full-height">
            <h1>Выберите ресторан</h1>
            <ul className="restaurant-list">
                {restaurants.map((r) => (
                    <li key={r.id}>
                        <Link to={`/${r.id}`}><img src={r.image} alt="" width={24} height={24} /> {r.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function RestaurantPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dishes = dishesConfig[id] || [];
    const restaurant = restaurants.find((r) => r.id === id);
    const mockTotal = restaurant?.mockTotal || 0;

    const [selected, setSelected] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const randomIndexes = Array.from({ length: 5 }, () => Math.floor(Math.random() * dishes.length));
        setSelected([...new Set(randomIndexes)]);
    }, [id]);

    const toggle = (index: number) => {
        setSelected((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 500);
    };

    if (submitted) {
        return (
            <div className="page full-height success-page">
                <div className="content centered">
                    <h2 className="success-message animate">Заказ оформлен!</h2>
                    <p className="accent">Сумма заказа: {mockTotal} ֏</p>
                </div>

                <div className="footer sticky">
                    <button className="accent-btn" onClick={() => navigate("/")}>Назад</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page full-height">
            <div className="header sticky">
                <h1><img src={restaurant?.image} width={48} height={48} alt="" style={{ borderRadius: "50%", marginRight: "8px" }} /> {restaurant?.name}</h1>
            </div>
            <div className="content">
                <div className="dish-grid">
                    {dishes.map((dish, i) => (
                        <div
                            key={dish.name}
                            className={`dish-card ${selected.includes(i) ? "selected" : ""}`}
                            onClick={() => toggle(i)}
                        >
                            <img src={dish.image} alt={dish.name} />
                            <div className="dish-info">
                                <h4>{dish.name}</h4>
                                <p>{dish.price} ֏</p>
                            </div>
                            <div className="checkbox">
                                {selected.includes(i) && <span>✓</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer sticky">
                <p><strong>Итого:</strong> <span className="accent">{mockTotal} ֏</span></p>
                <button className={`accent-btn ${loading ? 'loading' : ''}`} onClick={handleSubmit} disabled={loading}>
                    {loading ? <span className="spinner"></span> : "Заказать"}
                </button>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RestaurantList />} />
                <Route path="/:id" element={<RestaurantPage />} />
            </Routes>
        </Router>
    );
}

export default App;
