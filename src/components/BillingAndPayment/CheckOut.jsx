import React from "react";

const Checkout = () => {
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Payment
          </h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            {/* Payment Form */}
            <form
              action="#"
              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
            >
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="full_name"
                    className="mb-2 block text-sm font-bold text-gray-900"
                  >
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="card-number-input"
                    className="mb-2 block text-sm font-bold text-gray-900"
                  >
                    Card number*
                  </label>
                  <input
                    type="text"
                    id="card-number-input"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="card-expiration-input"
                    className="mb-2 block text-sm font-bold text-gray-900"
                  >
                    Card expiration*
                  </label>
                  <input
                    type="text"
                    id="card-expiration-input"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="12/23"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvv-input"
                    className="mb-2 flex items-center gap-1 text-sm font-bold text-gray-900"
                  >
                    CVV*
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="•••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Pay now
              </button>
            </form>

            {/* Summary Section */}
            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-normal text-gray-500">
                      Original price
                    </span>
                    <span className="text-base font-medium text-gray-900">
                      $6,592.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-normal text-gray-500">
                      Savings
                    </span>
                    <span className="text-base font-medium text-green-500">
                      -$299.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-normal text-gray-500">
                      Store Pickup
                    </span>
                    <span className="text-base font-medium text-gray-900">
                      $99
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-normal text-gray-500">
                      Tax
                    </span>
                    <span className="text-base font-medium text-gray-900">
                      $799
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    $7,191.00
                  </span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
