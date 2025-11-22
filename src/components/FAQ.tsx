import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "How long does setup take?",
        answer: "Our AI agents are designed for rapid deployment. Most clients are up and running within 24-48 hours, depending on the complexity of the integration and customization required."
    },
    {
        question: "Can it integrate with my CRM?",
        answer: "Yes, we support seamless integration with major CRM platforms including Salesforce, HubSpot, Zoho, and Pipedrive, ensuring your data flows smoothly between systems."
    },
    {
        question: "What languages are supported?",
        answer: "Our AI agents currently support over 30 languages, allowing you to engage with a global audience in their native language with native-level fluency."
    },
    {
        question: "How do you train the AI?",
        answer: "We use a combination of your existing knowledge base, past customer interactions, and specific brand guidelines to train the AI. This ensures it speaks with your brand's voice and accuracy."
    },
    {
        question: "What if the AI doesn't know an answer?",
        answer: "The AI is programmed to gracefully handle unknown queries by either asking clarifying questions or seamlessly handing off the conversation to a human agent, ensuring no customer is left frustrated."
    },
    {
        question: "How much does it cost?",
        answer: "We offer flexible pricing tiers based on your usage and specific needs. Contact our sales team for a personalized quote tailored to your business scale."
    },
    {
        question: "Is my customer data secure?",
        answer: "Absolutely. We adhere to strict enterprise-grade security protocols, including SOC 2 compliance and end-to-end encryption, to ensure your customer data is always protected."
    },
    {
        question: "Can I customize the AI's personality?",
        answer: "Yes! You can fully customize the AI's tone, style, and personality to perfectly match your brand identity, from professional and formal to friendly and casual."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden" id="faq">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 rounded-full mb-4">
                        <HelpCircle className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Everything you need to know about our AI agents
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="text-white font-semibold text-lg pr-8">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-slate-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
