
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Heart, Star } from 'lucide-react';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Blushy Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Basic cycle tracking',
        'Mood & symptom logging',
        'Period predictions',
        'Basic AI chat',
        'Partner connection'
      ],
      icon: '🍅',
      popular: false
    },
    {
      id: 'premium',
      name: 'Blushy Premium',
      price: '$0.00', // User will edit later
      period: '/month',
      description: 'Everything you need for complete wellness',
      features: [
        'Advanced cycle analytics',
        'Unlimited AI companion',
        'Premium partner features',
        'Health insights & tips',
        'Export health reports',
        'Priority support',
        'Ad-free experience'
      ],
      icon: '👑',
      popular: true
    },
    {
      id: 'couple',
      name: 'Blushy Couple',
      price: '$0.00', // User will edit later
      period: '/month',
      description: 'Perfect for partners in sync',
      features: [
        'Everything in Premium',
        'Dual partner accounts',
        'Couple wellness challenges',
        'Synchronized reminders',
        'Relationship insights',
        'Shared calendar view'
      ],
      icon: '💕',
      popular: false
    }
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // This will be connected to payment processing later
    console.log(`Subscribing to plan: ${planId}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gradient">Choose Your Blushy Plan</h2>
        <p className="text-muted-foreground">Unlock your full wellness potential</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="text-4xl mb-2">{plan.icon}</div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">
                  {plan.price}
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full ${
                  plan.id === 'free' 
                    ? 'variant-outline' 
                    : 'gradient-primary text-white'
                }`}
                disabled={plan.id === 'free'}
              >
                {plan.id === 'free' ? 'Current Plan' : 'Choose Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-pink-50 to-red-50 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">💝</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Special Launch Offer</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get 30% off your first year of Blushy Premium or Couple plans!
              </p>
              <Badge className="bg-red-100 text-red-700">
                Limited Time Only
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        <p>All plans include a 7-day free trial. Cancel anytime.</p>
        <p>Secure payments powered by Stripe. Your privacy is our priority.</p>
      </div>
    </div>
  );
};

export default Subscription;
