
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IntroductionProps {
  onComplete: () => void;
}

const Introduction = ({ onComplete }: IntroductionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [contraceptionOther, setContraceptionOther] = useState('');
  const [showContraceptionOther, setShowContraceptionOther] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const slides = [
    {
      emoji: '🍅',
      title: 'Welcome to Blushy Tomato',
      subtitle: 'Your personal period & wellness companion',
      description: 'Track your cycle, understand your body, and get personalized insights powered by AI.',
      features: ['Period tracking', 'Comprehensive symptom monitoring', 'AI health insights', 'Partner connection']
    },
    {
      emoji: '📅',
      title: 'Smart Period Tracking',
      subtitle: 'Never be surprised again',
      description: 'Get accurate predictions and personalized insights about your menstrual cycle.',
      features: ['Cycle predictions', 'Fertile window alerts', 'PMS & mood tracking', 'Custom symptom reminders']
    },
    {
      emoji: '💕',
      title: 'Your AI Health Companion',
      subtitle: 'Like having a caring bestie',
      description: 'Get support, advice, and understanding from our AI that feels like talking to your best friend.',
      features: ['24/7 caring support', 'Personalized insights', 'Advanced symptom analysis', 'Emotional wellness guidance']
    },
    {
      emoji: '👫',
      title: 'Connect with Your Partner',
      subtitle: 'Share your journey together',
      description: 'Help your partner understand your cycle and needs with smart sharing features.',
      features: ['Private cycle sharing', 'Smart partner notifications', 'Communication tools', 'Supportive reminders']
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide === slides.length - 1) {
      setCurrentSlide(slides.length); // Show terms page
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (currentSlide === slides.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="text-4xl mb-4">📋</div>
            <CardTitle className="text-xl font-bold text-gradient">
              Terms & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              ref={termsRef}
              className="bg-muted p-4 rounded-lg max-h-48 overflow-y-auto text-sm"
              onScroll={() => {
                if (termsRef.current) {
                  const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
                  if (scrollTop + clientHeight >= scrollHeight - 5) {
                    setHasScrolledToBottom(true);
                  }
                }
              }}
            >
              <h3 className="font-semibold mb-2">Terms of Service</h3>
              <p className="mb-2">By using Blushy Tomato ("we", "our", or "us"), you agree to these Terms of Service ("Terms"). Please read them carefully.</p>
              
              <h4 className="font-medium mb-1 mt-3">1. Acceptance of Terms</h4>
              <p className="text-xs mb-2">By accessing or using our menstrual cycle tracking application, you agree to be bound by these Terms and our Privacy Policy.</p>
              
              <h4 className="font-medium mb-1 mt-3">2. Description of Service</h4>
              <p className="text-xs mb-2">Blushy Tomato is a digital health application designed to help users track their menstrual cycles, symptoms, and related health information. We provide AI-powered insights and partner sharing features.</p>
              
              <h4 className="font-medium mb-1 mt-3">3. User Responsibilities</h4>
              <ul className="list-disc list-inside space-y-1 text-xs mb-2">
                <li>Provide accurate and truthful health information</li>
                <li>Use the app solely for personal health tracking purposes</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Not share your account with other individuals</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              
              <h4 className="font-medium mb-1 mt-3">4. Medical Disclaimer</h4>
              <p className="text-xs mb-2">IMPORTANT: This app is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
              
              <h4 className="font-medium mb-1 mt-3">5. Data Accuracy</h4>
              <p className="text-xs mb-2">While we strive to provide accurate cycle predictions and insights, individual biological variations mean that our predictions may not always be precise. Use our predictions as guidance only.</p>
              
              <h4 className="font-medium mb-1 mt-3">6. Account Termination</h4>
              <p className="text-xs mb-2">We reserve the right to terminate or suspend your account at our discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
              
              <h3 className="font-semibold mb-2 mt-4">Privacy Policy</h3>
              <p className="text-xs mb-2">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.</p>
              
              <h4 className="font-medium mb-1 mt-3">Information We Collect</h4>
              <ul className="list-disc list-inside space-y-1 text-xs mb-2">
                <li>Menstrual cycle data (dates, symptoms, mood, etc.)</li>
                <li>Account information (email, profile data)</li>
                <li>Usage analytics and app interaction data</li>
                <li>Device information for app functionality</li>
              </ul>
              
              <h4 className="font-medium mb-1 mt-3">How We Use Your Information</h4>
              <ul className="list-disc list-inside space-y-1 text-xs mb-2">
                <li>Provide personalized cycle predictions and insights</li>
                <li>Improve our AI algorithms and app functionality</li>
                <li>Send you relevant health tips and reminders</li>
                <li>Enable partner sharing features (with your consent)</li>
                <li>Provide customer support</li>
              </ul>
              
              <h4 className="font-medium mb-1 mt-3">Data Protection</h4>
              <ul className="list-disc list-inside space-y-1 text-xs mb-2">
                <li>All health data is encrypted both in transit and at rest</li>
                <li>We use industry-standard security measures</li>
                <li>We never sell your personal health information</li>
                <li>Access to your data is strictly limited to necessary personnel</li>
                <li>You have full control over data sharing with partners</li>
              </ul>
              
              <h4 className="font-medium mb-1 mt-3">Your Rights</h4>
              <ul className="list-disc list-inside space-y-1 text-xs mb-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Withdraw consent for data processing</li>
              </ul>
              
              <h4 className="font-medium mb-1 mt-3">Data Retention</h4>
              <p className="text-xs mb-2">We retain your data for as long as your account is active or as needed to provide services. You may delete your account at any time, which will result in the deletion of your personal data within 30 days.</p>
              
              <h4 className="font-medium mb-1 mt-3">Contact Information</h4>
              <p className="text-xs mb-2">If you have questions about these Terms or our Privacy Policy, please contact us at support@blushytomato.com</p>
              
              <p className="text-xs mt-4 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted && hasScrolledToBottom}
                onCheckedChange={(checked) => {
                  if (hasScrolledToBottom) {
                    setTermsAccepted(checked as boolean);
                  }
                }}
                disabled={!hasScrolledToBottom}
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy
                {!hasScrolledToBottom && <span className="text-xs text-muted-foreground block">Please scroll to read the full terms</span>}
              </label>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!termsAccepted}
                className="flex-1 gradient-primary text-white"
              >
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{slide.emoji}</div>
          <CardTitle className="text-xl font-bold text-gradient mb-2">
            {slide.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm">{slide.subtitle}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-center text-sm">{slide.description}</p>
          
          <div className="space-y-2">
            {slide.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 my-4">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentSlide > 0 && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="flex-1"
              >
                Previous
              </Button>
            )}
            <Button 
              onClick={handleNext}
              className="flex-1 gradient-primary text-white"
            >
              {currentSlide === slides.length - 1 ? 'Continue' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Introduction;
