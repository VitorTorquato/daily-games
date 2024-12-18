import { GameCard } from "@/components/card";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { GameProps } from "@/utils/types/game";

async function getData(title:string){

    try{
        const decodeTitle = decodeURI(title)//para tirar o encode na url
        const response = await fetch(`${process.env.NEXT_API}/next-api/?api=game&title=${decodeTitle}`)

        return response.json();
    }catch(err){
        return null
    }
}


export default async function Search({
    params: {title}
}:{
    params: {title:string}
}){

    const games:GameProps[] = await getData(title)

    return(
        <main
        className="w-full text-black"
        >
            <Container>
                <Input/>
                
                <h1 className="font-bold text-xl mt-8 mb-5">Veja o que encontaramos na nossa base:</h1>

                {!games && (<p>Esse jogo nao foi encontrado!..</p> )}


                <section className='grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              { games && 
              
                games.map((item) => (
                  <GameCard key={item.id} data={item}/>
              ))}
            </section>
            </Container>

        </main>
    )
}