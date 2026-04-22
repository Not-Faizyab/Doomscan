import { useState } from 'react'

function App() {
  const [target, setTarget] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('NETWORK')

  const execute = async () => {
    if (!target) return
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/api/scan?target=${target}`)
      const result = await response.json()
      setData(result.data)
    } catch (err) { console.error("API_OFFLINE") }
    setLoading(false)
  }

  return (
    <div className="h-screen flex flex-col font-sans">

      {/* Top Header / System Control */}
      <header className="h-16 border-b border-border bg-pane flex items-center px-8 justify-between flex-shrink-0">
        <div className="flex items-center gap-8">
          <span className="font-black text-white tracking-[0.2em] uppercase text-sm">Doomscan</span>
          <div className="flex items-center bg-canvas border border-border px-4 py-2">
            <input
              type="text"
              className="bg-transparent outline-none text-sm w-80 text-white font-mono"
              placeholder="TARGET_IDENTIFIER"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && execute()}
            />
          </div>
          <button
            onClick={execute}
            disabled={loading}
            className="bg-white text-black text-[11px] font-black px-8 h-10 tracking-widest transition-colors disabled:opacity-20 cursor-pointer uppercase"
          >
            {loading ? "INITIALIZING..." : "RUN_SCAN"}
          </button>
        </div>
        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          Node_Status: {loading ? 'Busy' : 'Available'}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">

        {/* Left Pane: Static Intelligence */}
        <aside className="w-80 border-r border-border bg-pane flex flex-col flex-shrink-0">
          <div className="p-6 border-b border-border text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">System_Specs</div>
          <div className="p-6 space-y-10 overflow-y-auto">
            <section>
              <label className="text-[10px] text-zinc-600 block mb-4 uppercase tracking-widest font-bold">Host_Environment</label>
              <div className="space-y-5 font-mono text-sm">
                <div>
                  <p className="text-[9px] text-zinc-700 mb-1 font-bold">SERVER_TYPE</p>
                  <p className="text-white break-all">{data?.tech_stack?.Server || '---'}</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-700 mb-1 font-bold">CORE_ENGINE</p>
                  <p className="text-white break-all">{data?.tech_stack?.Powered_By || '---'}</p>
                </div>
              </div>
            </section>

            {data?.tech_stack?.Missing_Sec_Headers && (
              <section>
                <label className="text-[10px] text-red-900 block mb-4 uppercase tracking-widest font-bold">Vulnerability_Report</label>
                <div className="space-y-2">
                  {data.tech_stack.Missing_Sec_Headers.map(h => (
                    <div key={h} className="text-xs bg-red-950/20 text-red-500 p-3 border border-red-900/30 font-mono break-all uppercase">
                      ! {h}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </aside>

        {/* Right Pane: Dynamic Data Workspace */}
        <main className="flex-1 flex flex-col bg-canvas">

          {/* Navigation Tabs */}
          <nav className="flex bg-pane border-b border-border h-12">
            {['NETWORK', 'DNS', 'WAYBACK', 'RAW'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 text-[10px] font-black tracking-[0.2em] transition-colors cursor-pointer ${activeTab === tab ? 'tab-active' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Data Field */}
          <div className="flex-1 overflow-auto p-8">
            {!data ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-800 font-mono text-sm tracking-widest">
                // AWAITING_INQUIRY_INITIATION
              </div>
            ) : (
              <div className="h-full font-mono text-sm">

                {activeTab === 'NETWORK' && (
                  <div className="space-y-6">
                    <p className="text-zinc-700 text-xs">// INTERFACE_SCAN_RESULTS // {data.target}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                      {data.open_ports.map(port => (
                        <div key={port} className="border border-border p-5 bg-pane flex justify-between items-center shadow-sm">
                          <span className="text-white font-bold tracking-tighter">PORT_{port}</span>
                          <span className="text-[9px] bg-zinc-900 px-2 py-1 text-zinc-500 font-bold uppercase">Open</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'DNS' && (
                  <div className="space-y-4">
                    <p className="text-zinc-700 text-xs">// SUBDOMAIN_MAPPING // TOTAL_{data.subdomains.length}</p>
                    <div className="grid grid-cols-1 gap-1">
                      {data.subdomains.map(sub => (
                        <div key={sub} className="p-3 border-b border-border/20 text-zinc-300">
                          <span className="text-zinc-800 mr-4 font-bold">»</span> {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'WAYBACK' && (
                  <div className="space-y-4">
                    <p className="text-zinc-700 text-xs">// HISTORICAL_TELEMETRY // ARCHIVE_PULL</p>
                    <div className="space-y-1">
                      {data.ghost_endpoints.map((url, i) => (
                        <div key={i} className="p-3 border-b border-border/20 text-zinc-500 flex break-all">
                          <span className="text-zinc-800 mr-6 shrink-0 font-bold">[{i.toString().padStart(3, '0')}]</span>
                          <span className="text-zinc-400">{url}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'RAW' && (
                  <div className="bg-pane p-8 border border-border overflow-auto max-h-full shadow-inner">
                    <pre className="text-white text-sm leading-relaxed">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>
                )}

              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  )
}

export default App