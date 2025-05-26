import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

class TourService {
  private driverObj = driver({
    animate: true,
    showProgress: true,
    smoothScroll: true,
  });

  startProductsTour() {
    this.driverObj.defineSteps([
      {
        element: '#products-heading',
        popover: {
          title: 'Network Equipment',
          description: 'Browse our selection of high-quality network equipment.',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '.product-card',
        popover: {
          title: 'Product Details',
          description: 'View detailed information about each product, including price and specifications.',
          side: "right",
          align: 'start'
        }
      },
      {
        element: '.add-to-cart-btn',
        popover: {
          title: 'Add to Cart',
          description: 'Click here to add products to your shopping cart.',
          side: "top",
          align: 'start'
        }
      }
    ]);

    this.driverObj.start();
  }

  startProfileTour() {
    this.driverObj.defineSteps([
      {
        element: '#profile-info',
        popover: {
          title: 'Profile Information',
          description: 'View and manage your personal information.',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '#theme-toggle',
        popover: {
          title: 'Theme Settings',
          description: 'Switch between light and dark mode for your preferred viewing experience.',
          side: "left",
          align: 'center'
        }
      }
    ]);

    this.driverObj.start();
  }

  startInvoicesTour() {
    this.driverObj.defineSteps([
      {
        element: '#invoices-table',
        popover: {
          title: 'Invoices Overview',
          description: 'View all your invoices and their current status.',
          side: "bottom",
          align: 'start'
        }
      },
      {
        element: '.invoice-status',
        popover: {
          title: 'Invoice Status',
          description: 'Check the payment status of each invoice.',
          side: "right",
          align: 'start'
        }
      }
    ]);

    this.driverObj.start();
  }
}

export const tourService = new TourService();