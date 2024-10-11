
import React, { useEffect, useState } from 'react';
import './Body.css';

function Body() {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=8`);
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setData((prev) => [...prev, ...data]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [offset]);

    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.documentElement.scrollHeight;
            const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
            if (currentHeight + 1 >= scrollHeight && !loading) {
                setOffset((prev) => prev + 8);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]); 

    return (
        <div className='app'>

            <div className="container">
                <div className='box'>
                    <h2 className='title'>Food Blog</h2>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit <br /> aut fugit, sed quia consequuntur.</p>
                    <div className='imgdiv'>
                        <div className='productslist'>
                            {data.map(product => (
                                <div key={product.id}>
                                    <img className='img' src={product.category.image} alt={product.title} />
                                </div>
                            ))}
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Body;
// https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}