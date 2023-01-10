import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Pokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!router.isReady) return;
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                setIsLoading(false);
                setPokemon(json);
            });
    }, [router.isReady]);

    return (
        <div className="container"  style={{padding: "30px 30px"}}>
            {isLoading ? (
                <div className="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ): null}
            {pokemon ? (
                <div className="card text-bg-success" style={{position: "absolute" ,padding-top: 20%;
    left: 40%;
    margin-top: -40px;
    margin-left: -50px;
    width: 300px;
    height: 400px}}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} className="Info" alt="..." style={{ height: "300px", width: "300px"}}/>
                    <div className="card-body text-center">
                        <h5 className="card-title">{pokemon.name}</h5>
                        <p className="card-text">levels: {pokemon._base_experience}</p>
                        <Link href="/">
                            <a className="btn btn-primary">
                                back
                            </a>
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
