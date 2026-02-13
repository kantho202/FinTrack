import React from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import moneyExpenses from '../../assets/icons8-money-50.png'
import { PiMoneyWavy } from 'react-icons/pi';
import { VscGraph } from 'react-icons/vsc';
import Card from './Card';
const TransactionManagement = () => {
    const handleModalOpen =(e)=>{
        e.preventDefault()
        showModal()
    }
    return (
        <div>
            <div className='flex justify-between items-center py-10'>
                <div>
                    <h1 className='font-bold text-4xl'>Transaction</h1>
                    <p className='font-semibold'>Track and manage your financial transactions</p>
                </div>
                <div className='font-bold text-xl btn p-7 bg-primary text-white'><FaPlusSquare /> Add Transaction</div>

            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl"><GrMoney /></span>
                        </div>
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Income</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-gray-900">34</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">
                                <PiMoneyWavy />
                            </span>
                        </div>
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-lg">Expenses</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Total Expenses</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl"><VscGraph />
                            </span>
                        </div>
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">Balance</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Net Balance</p>
                    <p className={`text-2xl font-bold `}>
                        {/* ${(totalIncome - totalExpense).toFixed(2)} */}3
                    </p>
                </div>
            </div>

            {/* modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>open modal</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default TransactionManagement;