import { useState } from 'react';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, LockKeyholeOpenIcon, MailCheckIcon } from 'lucide-animated';

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');

        if (!email || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        setLoading(true);

        const success = await login(email, password);

        setLoading(false);

        if (success) {
            const role = localStorage.getItem('role');

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/cliente');
            }
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <div className="backdrop-blur-xl bg-surface/70 border border-white/10 rounded-3xl shadow-neon p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-text-primary">
                            Iniciar Sesión
                        </h1>

                        <p className="text-text-secondary mt-2">
                            Bienvenido nuevamente
                        </p>
                    </div>

                    <motion.form
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="relative"
                        >
                            <MailCheckIcon className="absolute left-2 top-2.5 text-text-secondary" />

                            <input
                                type="text"
                                placeholder="Correo o usuario"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full bg-primary/60 border-b-2 border-border-subtle pl-10 pr-4 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-300"
                            />
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="absolute left-2 top-2.5 text-text-secondary">
                                {showPassword ? (
                                    <LockKeyholeOpenIcon size={30} />
                                ) : (
                                    <LockKeyholeIcon size={30} />
                                )}
                            </div>
                            <input
                                type={
                                    showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full bg-primary/60 border-b-2 border-border-subtle pl-10 pr-12 py-3 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent transition-colors duration-300"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-3.5 text-text-secondary hover:text-accent transition-colors"
                            >
                                {showPassword ? (
                                    <EyeIcon />
                                ) : (
                                    <EyeOffIcon />
                                )}
                            </button>
                        </motion.div>

                        {error && (
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: -5,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className="text-red-400 text-sm text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            variants={itemVariants}
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-accent hover:bg-accent-light text-primary font-bold py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50"
                        >
                            {loading
                                ? 'CARGANDO...'
                                : 'INGRESAR'}
                        </motion.button>

                        <motion.div
                            variants={itemVariants}
                            className="text-center text-sm text-text-secondary"
                        >
                            ¿No tienes cuenta?{' '}
                            <button
                                type="button"
                                onClick={() =>
                                    navigate('/register')
                                }
                                className="text-accent hover:underline"
                            >
                                Regístrate
                            </button>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;