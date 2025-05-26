import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Enterprise Router X9',
    description: 'High-performance router for enterprise networks with advanced security features and 10Gbps throughput.',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Managed Switch Pro',
    description: '24-port managed switch with PoE+ support, ideal for expanding your network infrastructure.',
    price: 849.99,
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Wireless Access Point Ultra',
    description: 'Next-generation Wi-Fi 6 access point with mesh networking capabilities and extended range.',
    price: 399.99,
    image: 'https://images.pexels.com/photos/4218883/pexels-photo-4218883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];