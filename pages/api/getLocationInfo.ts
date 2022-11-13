import type { NextApiRequest, NextApiResponse } from 'next';
import { textSearch } from '@/lib/getPlaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        var response = {}
        
        const placesSearchResponse: any = await textSearch({ text: req.body.address });
        console.log(placesSearchResponse);
        if (placesSearchResponse && placesSearchResponse.length) {
            response = {
                picture: 'https://maps.googleapis.com/maps/api/place/photo?photo_reference='
                    + placesSearchResponse[0].photos[0].photo_reference
                    + '&key=' + 'AIzaSyDq2MkNLzP6Q8Q4yce94-8E6dyuTljobgs'
                    + '&maxheight=2000',
                ...placesSearchResponse[0]
            }
        }
    
        res.status(200).send(response);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}
