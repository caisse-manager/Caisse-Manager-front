import Image from "next/image"
import { CheckSquare } from 'lucide-react'

export default function Fonctionalites(){
    return (
        <section className="container mx-auto py-16 ">
            <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-900/20 to-red-600/20 rounded-xl blur-xl "></div>
            <div className="relative bg-gradient-to-r from-gray-900 to-black rounded-xl overflow-hidden m-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <div className="p-8 ">
                    <Image
                    src="/caisse-manager-logo.png"
                    width={600}
                    height={500}
                    alt="Caisse Manager Dashboard"
                    className="rounded-lg shadow-lg"
                    />
                </div>
                <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-6">Logiciel de caisse complet</h2>
                    <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                        <CheckSquare className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                        <h3 className="font-medium text-lg">Gestion des commandes</h3>
                        <p className="text-gray-400">Interface intuitive pour une prise de commande rapide</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckSquare className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                        <h3 className="font-medium text-lg">Analytics avancés</h3>
                        <p className="text-gray-400">Suivez vos ventes et optimisez votre activité</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckSquare className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                        <h3 className="font-medium text-lg">Gestion des stocks</h3>
                        <p className="text-gray-400">Contrôlez votre inventaire en temps réel</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckSquare className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                        <h3 className="font-medium text-lg">Support technique</h3>
                        <p className="text-gray-400">Assistance 7j/7 pour répondre à vos besoins</p>
                        </div>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}