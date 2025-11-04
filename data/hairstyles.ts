
export interface Hairstyle {
  id: string;
  name: string;
  prompt: string;
  imageUrl: string;
}

export const hairstyleOptions: Hairstyle[] = [
  {
    id: 'hs1',
    name: 'Bob Loiro Encaracolado',
    prompt: 'a vibrant, curly blonde bob with playful layers',
    imageUrl: 'https://images.unsplash.com/photo-1588693951525-7b5b9194f877?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'hs2',
    name: 'Bob Preto Elegante',
    prompt: 'a sleek, sharp, chin-length black bob hairstyle, very modern and chic',
    imageUrl: 'https://images.unsplash.com/photo-1628972018788-d39281203183?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'hs3',
    name: 'Morena Ondulado Longo',
    prompt: 'long, wavy brunette hair with sun-kissed highlights and a natural, beachy texture',
    imageUrl: 'https://images.unsplash.com/photo-1554515155-83ac7fad5a9b?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'hs4',
    name: 'Pixie Ruivo Ousado',
    prompt: 'a bold, fiery red pixie cut with sharp, textured layers',
    imageUrl: 'https://images.unsplash.com/photo-1617056364899-31e4e37f6932?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'hs5',
    name: 'Penteado Prateado Trançado',
    prompt: 'an elegant, intricate braided updo with shimmering silver hair',
    imageUrl: 'https://images.unsplash.com/photo-1595959194222-a72a722513ce?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'hs6',
    name: 'Pompadour Moderno',
    prompt: 'a stylish modern pompadour with faded sides and dark hair',
    imageUrl: 'https://images.unsplash.com/photo-1599577238244-142502753a4b?q=80&w=300&auto=format&fit=crop',
  },
];
