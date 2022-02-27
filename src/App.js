import { DashboradTablet } from './DashboradTablet';
import { DashboardMobile } from './DashboardMobile';
import { DashboardWeb } from './DashboardWeb';
import { GetURLSearchParamsMethod } from './Services/GetURLSearchParamsMethod';

function App() {
  const View = GetURLSearchParamsMethod('view')
  return (
    <div className="App">
      {(((View === 'mobile') && <DashboardMobile />)
        || (View === 'tablet') && <DashboradTablet />)
        || (View === 'web') && <DashboardWeb />}
      )
    </div>
  );
}
export default App;

