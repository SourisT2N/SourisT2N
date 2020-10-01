using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApplication1
{
    class KhachHang
    {
        public KhachHang()
        { 
            Ghes = new List<int>();
        }
        public string TenKH { get; set; }
        public string Phone { get; set; }
        public List<int> Ghes { get; set; }
        public double TinhTien 
        {
            get {
                return Ghes.Count * 100000;
            }
        }
        public override string ToString()
        {
            return this.TenKH;
        }
    }
}
