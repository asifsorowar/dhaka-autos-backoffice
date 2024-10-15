import type { NextApiRequest, NextApiResponse } from 'next';
import cheerio from 'cheerio';

type Data = {
    model: string;
    imageUrl: string;
    year: string;
    color: string;
};

type ResponseData = {
    message?: string;
    data?: Data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        if (req.method !== 'POST') return res.status(200).json({ message: `Invalid method: ${req.method}` });

        const baseUrl = 'https://carmodsbd.com/auction-sheet-verification';

        const resp = await fetch(baseUrl + `?chassisno=${req.body?.chassisId}`);
        const body = await resp.text();

        const $ = cheerio.load(body);

        const results: Data = {
            model: '',
            imageUrl: '',
            year: '',
            color: '',
        };

        $('table tr').each((index, element) => {
            if (index === 0) return;

            const row = $(element);

            const cells = row.find('td');

            if (cells.length > 0) {
                let [name, value] = row.find('td').text().trim().split(':');
                name = name.trim().toLocaleLowerCase();
                value = value.trim().toLocaleLowerCase();

                if (name in results) {
                    results[name as keyof Data] = value;
                }

                const button = cells.eq(0).find('button');
                const style = button.attr('style');

                if (style) {
                    let imageUrl = '';
                    const match = style.match(/url\((.*?)\)/);
                    if (match && match[1]) {
                        imageUrl = match[1].replace(/['"]/g, '');

                        results.imageUrl = imageUrl;
                    }
                }
            }
        });

        console.log('The verified data::', results);

        res.status(200).json({ data: results });
    } catch (error) {
        console.log('error::', error);
        res.status(400).json({ message: 'error!' });
    }
}
