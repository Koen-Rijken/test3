import { Invoice } from '../types';

export const invoices: Invoice[] = [
  {
    id: '1',
    userId: '1', // Koen Rijken (admin)
    date: '2025-04-15',
    amount: 2549.97,
    status: 'paid',
    items: [
      {
        id: '101',
        productId: '1',
        productName: 'Enterprise Router X9',
        quantity: 1,
        unitPrice: 1299.99
      },
      {
        id: '102',
        productId: '2',
        productName: 'Managed Switch Pro',
        quantity: 1,
        unitPrice: 849.99
      },
      {
        id: '103',
        productId: '3',
        productName: 'Wireless Access Point Ultra',
        quantity: 1,
        unitPrice: 399.99
      }
    ]
  },
  {
    id: '2',
    userId: '1', // Koen Rijken (admin)
    date: '2025-03-22',
    amount: 1699.98,
    status: 'paid',
    items: [
      {
        id: '201',
        productId: '1',
        productName: 'Enterprise Router X9',
        quantity: 1,
        unitPrice: 1299.99
      },
      {
        id: '202',
        productId: '3',
        productName: 'Wireless Access Point Ultra',
        quantity: 1,
        unitPrice: 399.99
      }
    ]
  },
  {
    id: '3',
    userId: '2', // Klaas Rijken (user)
    date: '2025-04-10',
    amount: 399.99,
    status: 'pending',
    items: [
      {
        id: '301',
        productId: '3',
        productName: 'Wireless Access Point Ultra',
        quantity: 1,
        unitPrice: 399.99
      }
    ]
  }
];

export const getUserInvoices = (userId: string): Invoice[] => {
  return invoices.filter(invoice => invoice.userId === userId);
};