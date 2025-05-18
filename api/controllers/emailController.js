// D:\paraSuasLembrancas\api\controllers\emailController.js
import dns from 'dns';

export const checkEmailDomain = async (req, res) => {
    const { email } = req.body;

    // Validação básica do formato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ valid: false, message: "Formato de e-mail inválido" });
    }

    const domain = email.split('@')[1];

    try {
        // Verifica registros MX do domínio
        const mxRecords = await new Promise((resolve, reject) => {
            dns.resolveMx(domain, (err, addresses) => {
                if (err || !addresses || addresses.length === 0) {
                    reject(err || new Error("Domínio não possui servidores de e-mail (MX)"));
                } else {
                    resolve(addresses);
                }
            });
        });

        res.status(200).json({ 
            valid: true, 
            message: "Domínio válido (MX records encontrados)" 
        });
    } catch (error) {
        res.status(400).json({ 
            valid: false, 
            message: "Domínio de e-mail inválido ou não encontrado" 
        });
    }
};