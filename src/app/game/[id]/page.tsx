import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Label } from "./components/label";
import { GameCard } from "@/components/card";
import { Metadata } from "next";


interface PropsParams{
    params:{
        id:string;
    }
}

export async function generateMetaData({params}:PropsParams) : Promise<Metadata>{

    try{
        const response:GameProps = await fetch(`${process.env.NEXT_API}/next-api/?api=game&id=${params.id}` ,{next:{revalidate:320}})
        .then((res) => res.json())
        // .catch(() => {
        //     return{
        //         title:"DailyGames, descubra jogos incriveis para se devertir"
        //     }
        // })
        // console.log(response.title)

        return{
            title: response.title,
            description:`${response.description.slice(0,100)}...`,
            openGraph:{
                title:response.title,
                images: [response.image_url]
            },
            robots:{
                index:true,
                follow:true,
                nocache:true,
                googleBot:{
                  index:true,
                  follow:true,
                  noimageindex:true
                }
              }
            

    } 

    }catch(err){
        console.log(err)
        return{
            title:"DailyGames - Descubras jogos incriveis para se divertir"
        }
    }
}

async function getData(id:string){

    try{
        const response = await fetch(`${process.env.NEXT_API}/next-api/?api=game&id=${id}` ,{next:{revalidate:320}})

        return response.json();
    }catch(err){
        throw new Error("Failed to fetch data")
    }
}

async function getRandomGame(){
    try{
        const response = await fetch(`${process.env.NEXT_API}/next-api/?api=game_day` ,{cache:"no-store"})

        return response.json();
    }catch(err){
        throw new Error("Failed to fetch data")
    }
}




export default async function Game({
    params,
}:{
    params:{id:string}
}){

    const {id} = params
    
    const data:GameProps  = await getData(id);
    const randomGame:GameProps =  await getRandomGame();


 
    if(!data){
        redirect("/")
    }



    return(
        <main className="w-full text-black">
            <div className="bg-black h-80 w-full relative sm:h-96">
            <Image
                  src={data.image_url}
                  alt={data.title}
                  priority={true}
                  quality={100}
                  fill={true}
                  sizes="(max-width:768px) 100vw , (max-width: 1200px) 44vw"
                  className="object-cover w-full h-80 sm:h-96 rounded-lg opacity-80"
                  />
            </div>

            <Container>
                <h1 className="text-xl font-bold my-4">{data.title}</h1>
                <p>{data.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">plataformas</h2>
                <div className="flex gap-2 flex-wrap">
            {data.platforms.map((item) => (
                <Label key={item} name={item}/>
            ))}

                </div>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                <div className="flex gap-2 flex-wrap">
            {data.categories.map((item) => (
                <Label key={item} name={item}/>
            ))}
                </div>

                <p className="mt-7 mb-2"><strong>Data de lancamento:</strong> {data.release}</p>


                <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado</h2>

                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={randomGame}/>
                    </div>
                </div>
            </Container>
        </main>
    )
}