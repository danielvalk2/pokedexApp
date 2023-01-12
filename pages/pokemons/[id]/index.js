import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from '../../../styles/Home.module.css'

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
        <div className="container"  style={{height: "95vh"}}>
            {isLoading ? (
                <div className="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            ): null}
            {pokemon ? (
                <div className="card text-bg-success" style={{display:"block", height: "auto",width: "50%",margin: "5px",translate: "50% 50%", position: "relative"}}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="..."/>
                    <div className="card-body text-center">
                        <h5 className="card-title">{pokemon.name}</h5>
                        <p className="card-text">levels: {pokemon.location_area_encounters}</p>
                        <Link href="/">
                            <a className="btn btn-dark">
                                back
                            </a>
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
