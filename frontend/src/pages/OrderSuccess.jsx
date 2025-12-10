import { Link, useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="text-center mb-6">
            
            <div className="mb-4">
              <svg className="w-20 h-20 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Thank you for your order!
            </h1>

            <p className="text-lg text-gray-600 mb-4">
              Your order has been placed successfully.
            </p>

            {/* Order Number */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Order Confirmation Number</p>
              <p className="text-xl font-bold text-gray-900">{orderId}</p>
            </div>
          </div>

          {/* What's Next? */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>

            <div className="space-y-4">

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Order Confirmation Email</h3>
                  <p className="text-sm text-gray-600">
                    We've sent you an email with your order details and tracking information.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Processing Your Order</h3>
                  <p className="text-sm text-gray-600">
                    Your order is being prepared. You'll receive shipping information soon.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Your order will be delivered to your address. Estimated time is shown in your email.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Continue Shopping */}
            <Link
              to="/"
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-md text-center transition-colors"
            >
              Continue Shopping
            </Link>

            {/* View Orders → Takes to /order-status */}
            <Link
              to="/order-status"
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 font-medium py-3 px-6 rounded-md text-center transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Track Order */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Track Your Order</h4>
              <p className="text-sm text-gray-600 mb-2">
                Check the status of your order and track its delivery.
              </p>

              {/* FIXED LINK HERE */}
              <Link 
                to="/order-status"
                className="text-sm text-blue-600 hover:text-orange-600 hover:underline"
              >
                Track Order →
              </Link>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Customer Service</h4>
              <p className="text-sm text-gray-600 mb-2">
                Have questions about your order? We're here to help.
              </p>

              <a 
                href="#"
                className="text-sm text-blue-600 hover:text-orange-600 hover:underline"
              >
                Contact Us →
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
    