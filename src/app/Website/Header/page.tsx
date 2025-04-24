import DropDown from './MenuDropDown/page'

export default function HeaderPage(){ 


    return(
      <div className='flex justify-between text-4xl items-center mb-4 mt-2'>
          <span className='font-medium text-2xl mt-1 ml-1'> Shop </span>
          <DropDown />
       
      </div>

    )
}
