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
        <section className="py-20 sm:py-24 lg:py-28 bg-slate-950 relative overflow-hidden" id="faq">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-indigo-900/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 border border-indigo-500/15 rounded-2xl mb-6">
                        <HelpCircle className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Everything you need to know about our AI agents
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl overflow-hidden transition-all duration-500 ${
                                openIndex === index
                                    ? 'bg-white/[0.03] border-white/[0.08]'
                                    : 'bg-white/[0.01] border-white/[0.05] hover:border-white/[0.08]'
                            }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                            >
                                <span className="text-white font-medium text-base sm:text-lg pr-8">{faq.question}</span>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                    openIndex === index ? 'bg-indigo-500/15' : 'bg-white/[0.04]'
                                }`}>
                                    {openIndex === index ? (
                                        <ChevronUp className="w-4 h-4 text-indigo-400" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-400 leading-relaxed text-sm sm:text-base">
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
