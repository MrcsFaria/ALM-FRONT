import React, { useEffect, useState } from 'react';
import { Product } from '../ProductsView/ProductsView';
import imagem1 from '../../img/safety.png';
import '../../components/FrameCheckout/checkout.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// Atualização do tipo Product para incluir a quantidade
type ProductWithQuantity = Product & { quantidade: number };

type FaixaSuperiorProductsProps = {
    cartItems: ProductWithQuantity[]; // Recebe a lista de itens no carrinho, agora com quantidade
};

const FrameCheckout: React.FC<FaixaSuperiorProductsProps> = ({ cartItems }) => {
    const [showCartDetails, setShowCartDetails] = useState(false); // Estado para controlar visibilidade da área de detalhes do carrinho
    const [cartItemss, setCartItems] = useState<ProductWithQuantity[]>([]);
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const navigate = useNavigate();

    const toggleCartDetails = () => {
        setShowCartDetails(!showCartDetails);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!cep || !rua || !cidade || !estado || !numero) {
            alert("Por favor, preencha todos os campos antes de Finalizar a Compra.");
            return;
        } else {
            navigate('/Pagamento');
        }
    }

    useEffect(() => {
        const storedProducts = localStorage.getItem("Produtos");
        if (storedProducts) {
            try {
                const productArray: ProductWithQuantity[] = JSON.parse(storedProducts);

                // Consolidar itens com o mesmo nome e tamanho
                const consolidatedProducts: ProductWithQuantity[] = productArray.reduce((accumulator: ProductWithQuantity[], item: ProductWithQuantity) => {
                    const existingItem = accumulator.find(p => p.nome === item.nome && p.tamanhos === item.tamanhos);

                    if (existingItem) {
                        // Atualiza a quantidade se o item já existir
                        existingItem.quantidade += item.quantidade;
                    } else {
                        // Adiciona novo item à lista
                        accumulator.push(item);
                    }

                    return accumulator;
                }, []);

                // Atualiza o estado com a lista consolidada
                setCartItems(consolidatedProducts);
            } catch (error) {
                console.error('Erro ao processar os produtos do localStorage:', error);
            }
        }
    }, []);

    const handleIncreaseQuantity = (productId: number) => {
        const updatedItems = cartItemss.map(item => {
            if (item.id === productId) {
                return { ...item, quantidade: item.quantidade + 1 };
            }
            return item;
        });
        setCartItems(updatedItems);
        localStorage.setItem('Produtos', JSON.stringify(updatedItems));
    };

    const handleDecreaseQuantity = (productId: number) => {
        const updatedItems = cartItemss.map(item => {
            if (item.id === productId) {
                if (item.quantidade > 1) {
                    return { ...item, quantidade: item.quantidade - 1 };
                } else {
                    return null; // Retorna null para marcar o item que será removido
                }
            }
            return item;
        }).filter((item): item is ProductWithQuantity => item !== null); // Filtra para remover os itens marcados como null

        setCartItems(updatedItems);
        localStorage.setItem('Produtos', JSON.stringify(updatedItems));
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCep(value);

        // Se o valor do CEP tiver 8 caracteres (formato com hífen)
        if (value.length === 8) {
            fetch(`https://viacep.com.br/ws/${value}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        setRua(data.logradouro);
                        setCidade(data.localidade);
                        setEstado(data.uf);
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar CEP:', error);
                });
        }
    };


    // Função para calcular o valor total dos itens no carrinho
    const calcularTotal = () => {
        let total = 0;
        cartItemss.forEach(item => {
            total += item.preco * item.quantidade;
        });
        return total.toFixed(2); // Retorna o total formatado com duas casas decimais
    };

    const getImageUrl = (imagePath: string): string => {
        // Retorna o caminho da imagem ajustado
        return `/img/tenis/${imagePath.trim()}`;
    };

    return (
        <div className='body'>
            <div>
                <a style={{ fontSize: '50px', fontWeight: 400 }}>Checkout</a>
                <div className='' style={{ fontSize: '24px', fontWeight: 400 }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {cartItemss.map((item, index) => (
                            <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                {item.imagem && (
                                    <img src={getImageUrl(item.imagem.split(',')[0])} alt={item.nome} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                )}
                                <span style={{ marginRight: '10px', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{item.nome + ' - Tam ' + item.tamanhos}</span><span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>- R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                                <button onClick={() => handleDecreaseQuantity(item.id)} className='btn btn-dark ml-5'>-</button>
                                <span className='ml-2' >{item.quantidade}</span>
                                <button onClick={() => handleIncreaseQuantity(item.id)} className='btn btn-dark ml-2'>+</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ borderTop: '3px solid black' }}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="cep" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 500 }}>CEP (Somente Números):</label>
                            <input
                                type="text"
                                id="cep"
                                value={cep}
                                onChange={handleCepChange}
                                className="form-control"
                                placeholder="Digite o CEP"
                                minLength={8}
                                maxLength={8}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rua" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 500 }}>Rua:</label>
                            <input
                                type="text"
                                id="rua"
                                value={rua}
                                onChange={(e) => setRua(e.target.value)}
                                className="form-control"
                                placeholder="Digite a rua"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 500 }}>Número:</label>
                            <input
                                type="text"
                                id="numero"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                className="form-control"
                                placeholder="Digite o número"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cidade" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 500 }}>Cidade:</label>
                            <input
                                type="text"
                                id="cidade"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                className="form-control"
                                placeholder="Digite a cidade"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 500 }}>Estado:</label>
                            <input
                                type="text"
                                id="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                className="form-control"
                                placeholder="Digite o estado"
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className='quadrado-cinza'>
                <div className='area-finalizar'>
                    <div className='sub'>
                        <a style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Subtotal</a>
                        <a style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>R$ {calcularTotal()}</a>
                    </div>
                    <div className='frete'>
                        <a style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Frete</a>
                        <a style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>R$ 20,00</a>
                    </div>
                    <div className='tot'>
                        <a style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>Total</a>
                        <a style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>R$ {parseInt(calcularTotal()) + 20}</a>
                    </div>
                    <button className="btn btn-dark" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }} onClick={handleSubmit}>Finalizar</button>
                </div>
                <div className='selo-seg'>
                    <img
                        src={imagem1}
                        alt="Logo"
                        className="img-fluid mx-3"
                    />
                    <a style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>COMPRA SEGURA</a>
                </div>
            </div>
        </div>
    );
}

export default FrameCheckout;