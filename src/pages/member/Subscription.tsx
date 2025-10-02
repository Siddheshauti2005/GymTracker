import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Check, CreditCard, Calendar } from 'lucide-react';
import { SubscriptionPlan } from '../../types';

export const Subscription: React.FC = () => {
  const [currentPlan] = useState<string>('Basic');

  const plans: SubscriptionPlan[] = [
    {
      id: '1',
      name: 'Basic',
      price: 29,
      duration: 30,
      features: [
        'Access to gym facilities',
        'Workout tracking app',
        'Basic workout plans',
        'Email support'
      ]
    },
    {
      id: '2',
      name: 'Pro',
      price: 59,
      duration: 30,
      features: [
        'Everything in Basic',
        'Personal trainer sessions (2/month)',
        'Custom workout plans',
        'Progress analytics',
        'Priority support'
      ]
    },
    {
      id: '3',
      name: 'Elite',
      price: 99,
      duration: 30,
      features: [
        'Everything in Pro',
        'Unlimited trainer access',
        'Nutrition planning',
        '24/7 support',
        'Guest passes (4/month)',
        'Exclusive classes'
      ]
    }
  ];

  const handleUpgrade = (planName: string) => {
    alert(`Upgrading to ${planName} plan. In production, this would redirect to Stripe payment.`);
  };

  const paymentHistory = [
    { id: '1', date: '2025-09-01', amount: 29, plan: 'Basic', status: 'completed' as const },
    { id: '2', date: '2025-08-01', amount: 29, plan: 'Basic', status: 'completed' as const },
    { id: '3', date: '2025-07-01', amount: 29, plan: 'Basic', status: 'completed' as const },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscription & Billing</h1>
          <p className="text-gray-400 mt-1">Manage your membership plan</p>
        </div>

        <Card className="border-2 border-emerald-500">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Current Plan</p>
                <p className="text-3xl font-bold text-white mt-1">{currentPlan}</p>
                <p className="text-gray-400 text-sm mt-2">Next billing date: November 1, 2025</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Monthly Payment</p>
                <p className="text-3xl font-bold text-emerald-500 mt-1">$29</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Available Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isCurrentPlan = plan.name === currentPlan;
              return (
                <Card key={plan.id} className={isCurrentPlan ? 'border-2 border-emerald-500' : ''}>
                  <CardContent className="py-6">
                    {isCurrentPlan && (
                      <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                        CURRENT PLAN
                      </div>
                    )}
                    {plan.name === 'Pro' && !isCurrentPlan && (
                      <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                        POPULAR
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-white mb-6">
                      ${plan.price}
                      <span className="text-xl text-gray-400">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="text-emerald-500 flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleUpgrade(plan.name)}
                      disabled={isCurrentPlan}
                      variant={isCurrentPlan ? 'ghost' : 'primary'}
                      className="w-full"
                    >
                      {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CreditCard className="text-emerald-500" size={24} />
              <h2 className="text-xl font-bold text-white">Payment Method</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-500/10 p-3 rounded-lg">
                  <CreditCard className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-white font-semibold">Visa ending in 4242</p>
                  <p className="text-gray-400 text-sm">Expires 12/2026</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">Update</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="text-emerald-500" size={24} />
              <h2 className="text-xl font-bold text-white">Payment History</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <div>
                    <p className="text-white font-semibold">{payment.plan} Plan</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(payment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">${payment.amount}</p>
                    <p className="text-emerald-500 text-sm capitalize">{payment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-900/20 border-orange-700">
          <CardContent className="py-6">
            <h3 className="text-lg font-bold text-white mb-2">Need help with billing?</h3>
            <p className="text-gray-300 mb-4">Contact our support team for any billing questions or concerns.</p>
            <Button variant="secondary">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
