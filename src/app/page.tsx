import {BsArrowRightSquare} from 'react-icons/bs'
import {GameProps} from '@/utils/types/game';

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { GameCard } from "@/components/card";


async function getDailyGame(){

  try{
      const response = await fetch(`${process.env.NEXT_API}/next-api/?api=game_day` ,{next:{revalidate:320}})//fazer a base url como variavel de ambiente
    return response.json();

  }catch(error){
    throw new Error("Failed ro fetch data")
  }

}

async function getGamesData(){

  
  try{
    const response = await fetch(`${process.env.NEXT_API}/next-api/?api=games` ,{next:{revalidate:320}})
  return response.json();

}catch(error){
  throw new Error("Failed ro fetch data")
}

}

export default async function Home() {
 
  const dailyGame:GameProps = await getDailyGame();

  const data:GameProps[] = await getGamesData();

  
 
  return (
    <main className="w-full">

        <Container>
          <h1 className="text-center font-bold text-xl mt-8 mb-5">Separamos um jogo exclusivo para voce</h1>

          <Link href={`/game/${dailyGame.id}`}>
            <section className="w-full bg-black rounded-lg">
                  <div className="relative w-full max-h-96 h-96 rounded-lg">
                  <div className="absolute z-20 bottom-1 left-2 flex items-center justify-center gap-2">
                    <p className="font-bold text-xl text-white">{dailyGame.title}</p>
                    <BsArrowRightSquare size={24} color="#FFF"/>
                  </div>

                  <Image
                  src={dailyGame.image_url}
                  alt={dailyGame.title}
                  priority={true}
                  quality={100}
                  fill={true}
                  sizes="(max-width:768px) 100vw , (max-width: 1200px) 44vw"
                  className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-200"
                  />
                </div>
            </section>
          </Link>

            <Input/>

            <h2 className='font-bold text-lg mt-8 mb-5'>Jogos para conhecer</h2>

            <section className='grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {data.map((item) => (
                  <GameCard key={item.id} data={item}/>
              ))}
            </section>
        </Container>

    </main>
  );
}
