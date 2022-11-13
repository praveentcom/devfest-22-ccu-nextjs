import { Client, PlaceType1 } from "@googlemaps/google-maps-services-js"

const mapsClient = new Client({})

export async function textSearch({ text }: {text: string}) {
    try {
        var response = await mapsClient.textSearch({
            params: {
                query: text,
                key: 'AIzaSyDq2MkNLzP6Q8Q4yce94-8E6dyuTljobgs'
            },
        })
        return response.data.results
    } catch (error) {
        return []
    }
}
