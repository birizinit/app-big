import React, { useState, useEffect } from 'react';
import WSButton from '../components/WSButton';
import Logo from '../components/Logo';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [particles, setParticles] = useState([]);

  // Gerar partículas sutis como na referência
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.2 + 0.1
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y <= -5 ? 105 : particle.y - particle.speed * 0.03
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects - Estilo da referência */}
      <div className="absolute inset-0">
        {/* Partículas sutis */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-[#D4B429] rounded-full opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
          />
        ))}

        {/* Gradient sutil no fundo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4B429]/5 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-3xl font-bold text-[#D4B429] mb-2">
            Wall Street Academy
          </h1>
          <p className="text-[#A0A0A0] text-base">
            Acesse sua conta
          </p>
        </div>

        {/* Card Principal - Estilo da referência */}
        <div className="bg-gradient-to-b from-[#1A1A1A]/90 to-[#0F0F0F]/90 backdrop-blur-xl rounded-2xl border border-[#333333] p-8 shadow-2xl">
          {/* Tabs Login/Cadastro */}
          <div className="flex mb-8 bg-[#0A0A0A] rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-[#D4B429] text-black' 
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-[#D4B429] text-black' 
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              Cadastro
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome (apenas no cadastro) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#D4B429] flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-[#0A0A0A]/60 border border-[#333333] focus:border-[#D4B429] rounded-lg px-4 py-3.5 text-white placeholder:text-[#666666] focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(212,180,41,0.2)]"
                    placeholder="Seu nome completo"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#D4B429] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-[#0A0A0A]/60 border border-[#333333] focus:border-[#D4B429] rounded-lg px-4 py-3.5 text-white placeholder:text-[#666666] focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(212,180,41,0.2)]"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Telefone (apenas no cadastro) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#D4B429] flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-[#0A0A0A]/60 border border-[#333333] focus:border-[#D4B429] rounded-lg px-4 py-3.5 text-white placeholder:text-[#666666] focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(212,180,41,0.2)]"
                    placeholder="(11) 99999-9999"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#D4B429] flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full bg-[#0A0A0A]/60 border border-[#333333] focus:border-[#D4B429] rounded-lg px-4 py-3.5 pr-12 text-white placeholder:text-[#666666] focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(212,180,41,0.2)]"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#666666] hover:text-[#D4B429] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Esqueci a senha (apenas no login) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-[#D4B429] hover:text-[#E6C547] transition-colors font-medium"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            {/* Botão de Submit */}
            <button
              type="submit"
              className="w-full bg-[#D4B429] hover:bg-[#E6C547] text-black font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,180,41,0.3)]"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>

            {/* Toggle Login/Cadastro */}
            <div className="text-center pt-4">
              <span className="text-[#A0A0A0] text-sm">
                {isLogin ? 'Não tem uma conta?' : 'Já possui conta?'}
              </span>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-[#D4B429] hover:text-[#E6C547] font-semibold text-sm transition-colors"
              >
                {isLogin ? 'Cadastre-se' : 'Fazer Login'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer - Estilo da referência */}
        <div className="text-center mt-8 space-y-1">
          <p className="text-[#A0A0A0] text-sm">
            Plataforma de trading profissional
          </p>
          <p className="text-[#666666] text-xs">
            Seguro & Confiável
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

