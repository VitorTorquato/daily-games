import { Container } from "@/components/container";
import Image from "next/image";

import {FaShareAlt} from 'react-icons/fa'
import { FavoriteCard } from "./components/favorite";
import { Metadata } from "next";

export const metadata :Metadata = {
    title: "Meu perfil - Daily Games sua plataforma de jogos!",
    description: "Perfil Sujeito Programador | Daily Games sua plataforma de jogos!"
}

export default function Profile(){



    return(
        <main className="w-full text-blac">
            <Container>
                <section className="w-flex flex-col items-center justify-between sm:flex-row mb-8 mt-6 relative gap-3">
                    <div className="w-full flex flex-col items-center sm:justify-normal justify-center gap-4 text-lg sm:flex-row">
                        <Image
                            className="rounded-full w-56 h-56"
                            src='/user.png'
                            width={100}
                            height={100}
                            alt='imagem perfil do usuario'
                            quality={100}
                            priority
                        />

                        <h1 className="font-bold text-2xl ">Sujeito programador</h1>
                    </div>

                    <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-4">
                        <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
                            Configuracoes
                        </button>

                        <button className="bg-gray-700 px-4 py-3 rounded-lg">
                           <FaShareAlt size={24} color="#FFF"/>
                        </button>
                    </div>

                </section>
                <section className="flex flex-wrap gap-5 flex-col md:flex-row">
                    
                    <div className="flex-grow flex-wrap"><FavoriteCard/></div>
                    <div className="flex-grow flex-wrap"><FavoriteCard/></div>
                    <div className="flex-grow flex-wrap"><FavoriteCard/></div>

                </section>
            </Container>
        </main>
    )
}