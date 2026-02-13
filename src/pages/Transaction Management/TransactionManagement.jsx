import React, { useEffect, useRef, useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import moneyExpenses from '../../assets/icons8-money-50.png'
import { PiMoneyWavy } from 'react-icons/pi';
import { VscGraph } from 'react-icons/vsc';
import Card from './Card';
const TransactionManagement = () => {
    const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    note: ''
  })
  const [filters, setFilters] = useState({ 
    type: '', 
    category: '', 
    search: '',
    dateFrom: '',
    dateTo: ''
  })
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  // Mock data for demonstration
  useEffect(() => {
    setCategories([
      { _id: '1', name: 'Food & Dining', type: 'expense', color: '#ef4444', icon: '🍽️' },
      { _id: '2', name: 'Transportation', type: 'expense', color: '#f59e0b', icon: '🚗' },
      { _id: '3', name: 'Shopping', type: 'expense', color: '#8b5cf6', icon: '🛍️' },
      { _id: '4', name: 'Entertainment', type: 'expense', color: '#06b6d4', icon: '🎬' },
      { _id: '5', name: 'Salary', type: 'income', color: '#10b981', icon: '💰' },
      { _id: '6', name: 'Freelance', type: 'income', color: '#059669', icon: '💼' },
    ])

    setTransactions([
      { _id: '1', amount: 45.50, type: 'expense', category: { _id: '1', name: 'Food & Dining', icon: '🍽️' }, date: '2024-02-10', note: 'Lunch at downtown restaurant' },
      { _id: '2', amount: 3500, type: 'income', category: { _id: '5', name: 'Salary', icon: '💰' }, date: '2024-02-01', note: 'Monthly salary payment' },
      { _id: '3', amount: 25, type: 'expense', category: { _id: '2', name: 'Transportation', icon: '🚗' }, date: '2024-02-09', note: 'Uber ride to office' },
      { _id: '4', amount: 120.75, type: 'expense', category: { _id: '3', name: 'Shopping', icon: '🛍️' }, date: '2024-02-08', note: 'Grocery shopping at supermarket' },
      { _id: '5', amount: 500, type: 'income', category: { _id: '6', name: 'Freelance', icon: '💼' }, date: '2024-02-07', note: 'Web development project' },
    ])
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const selectedCategory = categories.find(cat => cat._id === formData.category)
      const newTransaction = {
        _id: Date.now().toString(),
        ...formData,
        amount: parseFloat(formData.amount),
        category: selectedCategory
      }

      if (editingId) {
        setTransactions(prev => prev.map(t => t._id === editingId ? newTransaction : t))
      } else {
        setTransactions(prev => [newTransaction, ...prev])
      }

      setShowModal(false)
      setEditingId(null)
      setFormData({ amount: '', type: 'expense', category: '', date: new Date().toISOString().split('T')[0], note: '' })
      setLoading(false)
    }, 1000)
  }

  const handleEdit = (transaction) => {
    setEditingId(transaction._id)
    setFormData({
      amount: transaction.amount.toString(),
      type: transaction.type,
      category: transaction.category._id,
      date: transaction.date,
      note: transaction.note || ''
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t._id !== id))
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = !filters.type || transaction.type === filters.type
    const matchesCategory = !filters.category || transaction.category._id === filters.category
    const matchesSearch = !filters.search || 
      transaction.note?.toLowerCase().includes(filters.search.toLowerCase()) ||
      transaction.category.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      transaction.amount.toString().includes(filters.search)
    const matchesDateFrom = !filters.dateFrom || transaction.date >= filters.dateFrom
    const matchesDateTo = !filters.dateTo || transaction.date <= filters.dateTo
    
    return matchesType && matchesCategory && matchesSearch && matchesDateFrom && matchesDateTo
  }).sort((a, b) => {
    let aValue, bValue
    
    if (sortBy === 'date') {
      aValue = new Date(a.date)
      bValue = new Date(b.date)
    } else if (sortBy === 'amount') {
      aValue = a.amount
      bValue = b.amount
    } else if (sortBy === 'category') {
      aValue = a.category.name.toLowerCase()
      bValue = b.category.name.toLowerCase()
    } else if (sortBy === 'type') {
      aValue = a.type
      bValue = b.type
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const clearFilters = () => {
    setFilters({
      type: '',
      category: '',
      search: '',
      dateFrom: '',
      dateTo: ''
    })
    setSortBy('date')
    setSortOrder('desc')
  }

  const filteredCategories = categories.filter(cat => cat.type === formData.type)

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    const handleTransactionShowModal = () => {
        // e.preventDefault()
        transactionRef.current.showModal()
    }
    const transactionRef = useRef(null)
    return (
        <div>
            <div className='flex justify-between items-center py-10'>
                <div>
                    <h1 className='font-bold text-4xl'>Transaction</h1>
                    <p className='font-semibold'>Track and manage your financial transactions</p>
                </div>
                <div onClick={handleTransactionShowModal} className='font-bold text-xl btn p-7 bg-primary text-white'><FaPlusSquare /> Add Transaction</div>

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

             {/* Filters & Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear All
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Transactions</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by note, category, or amount..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
              <select
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="income">💰 Income</option>
                <option value="expense">💸 Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
          </div>

          {/* Sort Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">📅 Date</option>
                <option value="amount">💵 Amount</option>
                <option value="category">📁 Category</option>
                <option value="type">🏷️ Type</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
              <select
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition outline-none"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">⬇️ Descending (Newest/Highest first)</option>
                <option value="asc">⬆️ Ascending (Oldest/Lowest first)</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.type || filters.category || filters.search || filters.dateFrom || filters.dateTo || sortBy !== 'date' || sortOrder !== 'desc') && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                {filters.type && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Type: {filters.type}
                    <button
                      onClick={() => setFilters({ ...filters, type: '' })}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Category: {categories.find(c => c._id === filters.category)?.name}
                    <button
                      onClick={() => setFilters({ ...filters, category: '' })}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.search && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Search: "{filters.search}"
                    <button
                      onClick={() => setFilters({ ...filters, search: '' })}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(filters.dateFrom || filters.dateTo) && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Date: {filters.dateFrom || 'Start'} - {filters.dateTo || 'End'}
                    <button
                      onClick={() => setFilters({ ...filters, dateFrom: '', dateTo: '' })}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(sortBy !== 'date' || sortOrder !== 'desc') && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Sort: {sortBy} ({sortOrder})
                    <button
                      onClick={() => { setSortBy('date'); setSortOrder('desc') }}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

            {/* modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" >open modal</button> */}
            <dialog ref={transactionRef} className="modal">
                <div className="modal-box">
                    <fieldset className="fieldset space-y-3">
                        <div>
                            <h1 className='font-bold text-2xl'>Add  New Transaction</h1>
                            <p className='text-medium text-base'>Enter transaction information</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className='flex-1 w-full'>
                                <label className="label  pb-2">Amount</label>
                                <input type="email" className="input w-full focus:ring-2 focus:primary
                                 focus:border-transparent transition outline-none resize-none  border-gray-200"
                                    placeholder="Amount" />
                            </div>
                            <div className='w-full flex-1'>
                                <label className="label pb-2">Type</label>
                                <select defaultValue="Pick a font" className="select select-ghost w-full focus:ring-2 focus:primary focus:border-transparent transition outline-none resize-none border-gray-200">
                                    <option disabled={true}>Pick a font</option>
                                    <option>Inter</option>
                                    <option>Poppins</option>
                                    <option>Raleway</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="label pb-2">Category</label>
                            <select defaultValue="Pick a font" className="select select-ghost w-full 
                        outline-0 border-gray-200 focus:ring-2 focus:primary focus:border-transparent transition ">
                                <option disabled={true}>Pick a font</option>
                                <option>Inter</option>
                                <option>Poppins</option>
                                <option>Raleway</option>
                            </select>
                        </div>
                        <div>
                            <label className="label pb-2">Date</label>
                            <input type="date" className="input w-full focus:ring-2 focus:primary focus:border-transparent transition outline-none resize-none  border-gray-200" placeholder="Email" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Note (optional)</label>
                            <textarea
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:primary focus:border-transparent transition outline-none resize-none"
                                rows="3"
                                placeholder="Add a note about this transaction..."
                            //   value={formData.note}
                            //   onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            />
                        </div>
                        <div className='flex gap-3 items-center '>
                            <button className="btn flex-2  mt-4 btn-primary">Add Transaction</button>
                            {/* <button className="btn btn-neutral flex-1 mt-4">Close</button> */}
                            <div className="">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn  flex-1 mt-4 btn-primary">Close</button>
                                </form>
                            </div>
                        </div>
                    </fieldset>
                </div>

            </dialog>
        </div>
    );
};

export default TransactionManagement;