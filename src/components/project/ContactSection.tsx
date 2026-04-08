import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', interest: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  const inputClasses = "w-full bg-transparent border-b-2 border-black/5 py-4 text-[16px] font-semibold text-black outline-none transition-all focus:border-[#70061d] placeholder:text-black/20";

  return (
    <section 
      id="contact" 
      className="bg-white" 
      style={{ padding: 'clamp(100px, 12vw, 180px) 0' }}
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT: INFORMATION BLOCK */}
          <div className="lg:col-span-5">
            <span className="block font-bold text-[12px] tracking-[0.5em] text-[#70061d] uppercase mb-10">
              06 / CONTACT
            </span>
            
            <h2 className="text-[clamp(44px,6vw,84px)] font-[900] text-black leading-[0.9] tracking-tighter uppercase mb-10">
              Start Your <br /> 
              <span className="text-[#70061d] italic font-medium lowercase" style={{ fontFamily: 'serif' }}>legacy</span> here.
            </h2>
            
            <p className="text-[18px] md:text-[22px] text-black/50 leading-snug font-medium max-w-[440px] mb-14">
              Limited to 13 units. The final window for an elite investment in the Tricity corridor.
            </p>

            {/* ENHANCED LOCATION BLOCK */}
            <div className="mb-14 p-8 border-l-4 border-[#70061d] bg-[#fdf8f8]">
              <p className="text-[11px] font-black tracking-[0.3em] text-[#70061d] uppercase mb-3">
                Principal Office
              </p>
              <p className="text-[20px] md:text-[24px] font-[900] text-black leading-tight uppercase tracking-tight">
                SCO 205, The Summit <br /> 
                Zirakpur, Punjab
              </p>
            </div>

            {/* PREMIUM WHATSAPP BUTTON */}
            <a 
              href="https://wa.me/917717505741" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full max-w-[320px] py-5 px-8 bg-[#70061d] rounded-full transition-all duration-500 hover:bg-black hover:shadow-2xl hover:-translate-y-1"
            >
              <span className="text-[13px] font-black uppercase tracking-[0.2em] text-white">
                Chat on WhatsApp
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* RIGHT: THE FORM */}
          <div className="lg:col-span-7">
            <div className="bg-[#fafafa] p-10 md:p-16 rounded-3xl border border-black/5 shadow-sm">
              {formState === 'success' ? (
                <div className="py-20 text-center">
                  <h3 className="text-3xl font-black uppercase mb-4 text-[#70061d]">Sent.</h3>
                  <p className="text-black/40 font-bold uppercase tracking-widest text-xs">We will call you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Name</label>
                      <input type="text" required placeholder="Full Name" className={inputClasses} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Contact</label>
                      <input type="tel" required placeholder="+91" className={inputClasses} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40">I am interested in</label>
                    <select className={`${inputClasses} appearance-none cursor-pointer`} value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}>
                      <option value="">Choose Option</option>
                      <option value="plot">Residential Plot</option>
                      <option value="villa">Luxury Villa</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Requirements</label>
                    <textarea rows={2} placeholder="How can we help?" className={inputClasses} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState === 'loading'}
                    className="w-full bg-black text-white py-6 text-[13px] font-black tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#70061d]"
                  >
                    {formState === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;